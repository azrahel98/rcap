import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import routes from './router/router'
import Vue3Lottie from 'vue3-lottie'
import 'vue3-lottie/dist/style.css'

const pinia = createPinia()

createApp(App).use(routes).use(pinia).use(Vue3Lottie).mount('#app')
