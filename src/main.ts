import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import routes from './router/router'
import Vue3Lottie from 'vue3-lottie'
import Vcalendar from 'v-calendar'
import Boostrap from 'bootstrap-vue-3'
import Toast, { PluginOptions } from 'vue-toastification'

import 'vue3-lottie/dist/style.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'vue-toastification/dist/index.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'

const pinia = createPinia()

const config: PluginOptions = {
	timeout: 3000,

	toastClassName: 'toast_custom',
}

createApp(App)
	.use(routes)
	.use(pinia)
	.use(Boostrap)
	.use(Toast, config)
	.use(Vue3Lottie)
	.use(Vcalendar, {})
	.mount('#app')
