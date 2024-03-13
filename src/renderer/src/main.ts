import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '@renderer/assets/tailwind.scss'
import '@renderer/assets/global.scss'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
// router
import router from './router/index'

// pinia
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const app = createApp(App)
app.use(ElementPlus,{
    locale: zhCn
})
app.use(router)
app.use(pinia)

app.mount('#app')
