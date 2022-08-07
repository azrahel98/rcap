import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import routes from './router/router'
import Vue3Lottie from 'vue3-lottie'
import Vcalendar from 'v-calendar'
import Boostrap from 'bootstrap-vue-3'
import VueScreen from 'vue-screen'

import 'vue3-lottie/dist/style.css'

const pinia = createPinia()

createApp(App)
	.use(routes)
	.use(pinia)
	.use(Boostrap)
	.use(Vue3Lottie)
	.use(Vcalendar, {})
	.mount('#app')
