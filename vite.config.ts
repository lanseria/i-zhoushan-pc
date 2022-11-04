/// <reference types="vite" />

import path from 'path'
import type { ConfigEnv, UserConfig } from 'vite'
import { loadEnv } from 'vite'
import Vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { ArcoResolver } from 'unplugin-vue-components/resolvers'
import Unocss from 'unocss/vite'

export default ({ mode }: ConfigEnv): UserConfig => {
  const root = process.cwd()
  const env = loadEnv(mode, root)
  return {
    server: {
      host: env.VITE_HOST,
      port: +env.VITE_PORT,
      proxy: {
        '^\/api\/': {
          target: env.VITE_PROXY_URL,
          changeOrigin: true,
          rewrite: (path) => {
            const replacePath = path.replace(/^\/api/, '')
            return replacePath
          },
        },
      },
    },
    resolve: {
      alias: {
        '~/': `${path.resolve(__dirname, 'src')}/`,
        'vue': 'vue/dist/vue.esm-bundler.js',
      },
    },
    plugins: [
      Vue({
        reactivityTransform: true,
      }),
      vueJsx(),
      // https://github.com/antfu/unplugin-auto-import
      AutoImport({
        resolvers: [ArcoResolver()],
        imports: [
          'vue',
          'vue/macros',
          'vue-router',
          '@vueuse/core',
        ],
        dts: true,
        dirs: [
          './src/composables',
        ],
        vueTemplate: true,
      }),

      // https://github.com/antfu/vite-plugin-components
      Components({
        dts: true,
        resolvers: [
          ArcoResolver({
            resolveIcons: true,
            sideEffect: false,
          }),
        ],
      }),

      // https://github.com/antfu/unocss
      // see unocss.config.ts for config
      Unocss(),
    ],
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: {
            hack: `true; @import (reference) "${path.resolve(
              'src/assets/style/breakpoint.less',
            )}";`,
          },
          javascriptEnabled: true,
        },
      },
    },

    optimizeDeps: {
      include: [
        'echarts',
        'crypto-js',
        'dayjs',
        'dayjs/plugin/quarterOfYear',
        'dayjs/locale/zh-cn',
        'nanoid',
        '@arco-design/web-vue/es/locale/lang/zh-cn',
        '@vueuse/core',
      ],
    },
  }
}
