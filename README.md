# uniapp-gather-vue3

## 简介

- **技术栈：uni-app Vue3 Vite5 pinia2 TypeScript uView3**

## 特性

- **技术栈**：使用 Vue3/Vite4/pinia ,TypeScript 等前端技术开发;
- **[Unocss](https://github.com/unocss/unocss)**: 原子化 CSS, [iconify](https://github.com/iconify/iconify)图标
- **Eslint/Prettier**: 规范代码格式,统一编码;
- **路由拦截**: [uni-mini-router](https://gitee.com/fant-mini/uni-mini-router),类似Vue Router的API和功能,在uni-app中进行路由跳转、传参、拦截等常用操作;
- **请求拦截**: 使用[alova 请求](https://github.com/alovajs/alova),支持请求和响应拦截等;
- **Mock 数据**: 配合 alova 请求的[@alova/mock](https://github.com/alovajs/mock)，模拟 api 请求(App 不支持);
- **缓存加密**: 支持 AES 加密缓存,可设置区分在开发或生成环境中是否加密;
- **组件库**：使用uViewPlus UI 组件库;
- **小程序分包**：满足复杂的业务场景;

## 目录结构

```shell
├─ src
│   ├─assets # 静态资源目录
│   │
│   ├─components # 组件目录
│   │   ├─ BasicButton
│   │   │    ├─index.vue
│   │   │    └─prpos.ts
│   │   └─...
│   ├─enums # 枚举/常量
│   │   ├─ cacheEnum.ts
│   │   └─...
│   ├─pages # 页面
│   │   ├─ index
│   │   │    └─index.vue
│   │   └─...
│   ├─services # 接口相关
│   │   ├─ api # api
│   │   │    ├─auth.ts
│   │   │    └─...
│   │   └─ model # 数据模型
│   │        ├─authModel.d.ts
│   │        └─...
│   ├─settings # 设置
│   │   └─ encryptionSetting # 加密设置
│   ├─state # 状态管理模式(pinia)
│   │   ├─ modules # 数据模块
│   │   │    ├─auth.ts
│   │   │    └─...
│   │   │
│   │   └─ index.ts
│   ├─static # 静态公共文件
│   │   ├─ images # 图片
│   │   │    ├─avatar.png
│   │   │    └─...
│   │   │
│   │   └─ ...
│   ├─types # 类型文件
│   │   ├─ http.d.ts
│   │   └─ ...
│   └─utils # 工具类
│       ├─ cache # 缓存相关目录
│       ├─ http  # request相关目录
│       ├─ interceptors  # 拦截器相关目录
│       └─ ...
├─ .env
├─ .env.development
├─ .env.production
├─ .eslintignore
├─ .eslintrc.js
├─ .gitignore
├─ .prettierignore
├─ .prettierrc.js
├─ favicon.ico
├─ index.html
├─ package.json
├─ pnpm-lock.yaml
├─ README.md
├─ tree.txt
├─ tsconfig.json
└─ vite.config.ts
```

## 安装使用
注意：默认使用 pnpm 管理依赖，请根据个人习惯安装依赖，node版本>=16.14.0

- 安装依赖

```bash
pnpm install
```

- 运行

```bash
# 其他端请查看 package.json script
pnpm dev:h5
```

- 打包

```bash
# 其他端请查看 package.json script
pnpm build:h5
```

- 更新依赖到最新（新手请忽略）

```bash
pnpm up
# 打开HBuilder X alpha桌面程序-->点击上面的帮助-->历次更新说明-->获取最新版本号（如：3.7.2.20230217-alpha）
npx @dcloudio/uvm 3.7.2.20230217-alpha
```