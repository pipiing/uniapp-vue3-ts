import { createSSRApp } from 'vue'
import App from './App.vue'
// 引入 Pinia 仓库
import pinia from './stores'
// 引入 uView-plus
import uviewPlus from 'uview-plus'
// 引入 colorUi
import cuCustom from '@/colorui/components/cu-custom.vue'

export function createApp() {
  const app = createSSRApp(App)
  app.use(uviewPlus)
  app.use(pinia)

  // 引入cu-custom组件全局使用
  app.component('cu-custom', cuCustom)
  return {
    app,
  }
}
