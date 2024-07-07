/**
 *  vite 配置
 *  @see https://cn.vitejs.dev/config/
 *  @type {import('vite').UserConfig}
 */
import { resolve } from 'node:path';
import process from 'node:process';
import type { UserConfig } from 'vite';
import { defineConfig, loadEnv } from 'vite';
import TransformPages from 'uni-read-pages-vite';
import uni from '@dcloudio/vite-plugin-uni';
import UnoCSS from 'unocss/vite';
import transformClass from 'unplugin-transform-class/vite';
import { visualizer } from 'rollup-plugin-visualizer';
import ViteRestart from 'vite-plugin-restart';
import AutoImport from 'unplugin-auto-import/vite';

export default defineConfig(async ({ mode }) => {
  const root = process.cwd();
  const env = loadEnv(mode, resolve(root, 'env'));
  const isProd = mode === 'production';
  const { UNI_PLATFORM } = process.env;
  const isH5 = UNI_PLATFORM === 'h5';
  const { VITE_PROXY_PREFIX, VITE_UPLOAD_PROXY_PREFIX, VITE_BASE_URL, VITE_UPLOAD_URL, VITE_PORT } = env;

  return {
    base: './',
    envDir: './env', // 自定义env目录
    // 设置路径别名
    resolve: {
      alias: {
        '@': resolve('./src'),
      },
      extensions: ['.js', '.ts'], // 使用路径别名时想要省略的后缀名，可以自己 增减
    },
    // 自定义全局变量
    define: {
      'process.env': {},
      'PLATFORM': JSON.stringify(UNI_PLATFORM),
      'ROUTES': new TransformPages().routes,
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "./src/uni.scss";',
        },
      },
    },
    plugins: [
      // @ts-expect-error TODO uni() 会报错：uni is not a function,暂时使用此方式解决
      uni?.default(),
      AutoImport({
        include: [
          /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
          /\.vue$/,
          /\.vue\?vue/, // .vue
        ],
        imports: [
          'vue',
          'uni-app',
          'pinia',
          {
            'uni-mini-router': ['useRouter', 'useRoute'],
          },
          {
            alova: ['useRequest'],
          },
        ],
        dts: 'typings/auto-imports.d.ts',
        eslintrc: {
          enabled: true,
        },
      }),
      UnoCSS(),
      transformClass(),
      ViteRestart({
        restart: ['vite.config.ts', 'src/pages.json'],
      }),
      isH5 && isProd
      && visualizer({
        filename: './node_modules/.cache/visualizer/stats.html',
        open: true,
        gzipSize: true,
        brotliSize: true,
      }),
    ],
    // 开发服务器配置
    server: {
      host: true,
      // open: true,
      port: Number.parseInt(VITE_PORT!, 10),
      proxy: {
        [VITE_PROXY_PREFIX!]: {
          target: VITE_BASE_URL,
          changeOrigin: true,
          rewrite: (path: string) => path.replace(new RegExp(`^${VITE_PROXY_PREFIX}`), ''),
        },
        [VITE_UPLOAD_PROXY_PREFIX!]: {
          target: VITE_UPLOAD_URL,
          changeOrigin: true,
          rewrite: (path: string) => path.replace(new RegExp(`^${VITE_UPLOAD_PROXY_PREFIX}`), ''),
        },
      },
    },
    // 构建配置
    build: {
      outDir: 'dist',
      chunkSizeWarningLimit: 1500,
      sourcemap: !isProd,
      target: 'es6',
      minify: isProd ? 'terser' : false,
      terserOptions: {
        compress: {
          drop_console: isProd,
          drop_debugger: true,
        },
      },
      rollupOptions: {
        output: {
          entryFileNames: `assets/[name].${new Date().getTime()}.js`,
          chunkFileNames: `assets/[name].${new Date().getTime()}.js`,
          assetFileNames: `assets/[name].${new Date().getTime()}.[ext]`,
          compact: true,
        },
      },
    },
  } as UserConfig;
});
