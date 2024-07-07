import { createAlova } from 'alova';
import AdapterUniapp from '@alova/adapter-uniapp';
import { assign } from 'lodash-es';
import { checkStatus } from './checkStatus';
import { getBaseUrl, isUseMock } from '@/utils/env';
import { mockAdapter } from '@/mock';
import { ContentTypeEnum, ResultEnum } from '@/enums/httpEnum';
import type { API } from '@/services/model/baseModel';
import { getAuthorization } from '@/utils/auth';

const BASE_URL = getBaseUrl();

const ContentType = {
  'Content-Type': ContentTypeEnum.JSON,
  'Accept': 'application/json, text/plain, */*',
};

/**
 * alova 请求实例
 * @link https://github.com/alovajs/alova
 */
const alovaInstance = createAlova({
  baseURL: BASE_URL,
  localCache: null, // 设置为null即可全局关闭全部请求缓存
  ...AdapterUniapp({
    /* #ifndef APP-PLUS */
    mockRequest: isUseMock() ? mockAdapter : undefined, // APP 平台无法使用mock
    /* #endif */
  }),
  timeout: 5000,
  beforeRequest: (method) => {
    method.config.headers = assign(method.config.headers, ContentType);
    const { config } = method;
    const ignoreAuth = !config.meta?.ignoreAuth;
    const authorization = ignoreAuth ? getAuthorization() : null;
    if (ignoreAuth && !authorization) {
      throw new Error('[请求错误]：未登录');
    }
    method.config.headers.authorization = getAuthorization();
  },
  responded: {
    /**
     * 请求成功的拦截器
     * 第二个参数为当前请求的method实例，你可以用它同步请求前后的配置信息
     * @param response
     * @param method
     */
    onSuccess: async (response, method) => {
      const { config } = method;
      const { requestType } = config;
      const { statusCode, data: rawData, errMsg } = response as UniNamespace.RequestSuccessCallbackResult;
      if (statusCode === 200) {
        if (requestType) {
          return response;
        }
        const { code, message, data } = rawData as API;
        if (code === ResultEnum.SUCCESS) {
          return data as any;
        }
        checkStatus(statusCode, message || '');
        throw new Error(`请求错误[${code}]：${message}`);
      }
      throw new Error(`请求错误[${statusCode}]：${errMsg}`);
    },

    /**
     * 请求失败的拦截器，请求错误时将会进入该拦截器。
     */
    onError: (err) => {
      throw new Error(`请求错误：${err}`);
    },
  },
});

export const request = alovaInstance;
