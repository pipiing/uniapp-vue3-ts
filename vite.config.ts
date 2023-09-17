import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import AutoImport from 'unplugin-auto-import/vite'
import path from 'path'
import { fileURLToPath, URL } from 'node:url'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    uni(),
    // 自动导入vue3包
    AutoImport({
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/, // .vue
      ],
      imports: ['vue', 'uni-app'],
      dts: 'typings/auto-imports.d.ts',
    }),
  ],
  resolve: {
    alias: {
      //添加别名
      '~': path.resolve(__dirname, './'),
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        javascriptEnabled: true,
        additionalData: `
      @import "@/static/style/variable.scss";
      @import "@/static/style/mixin.scss";
      `,
      },
    },
  },
})
