import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // ← 有正確匯入 router

const app = createApp(App)
app.use(router)               // ← 有使用 router
app.mount('#app')
