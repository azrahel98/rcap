import { createApp } from 'vue'
import App from './App.vue'
import routes from './router/router'
import Mapbox from 'vue-mapbox-ts'
import Vcalendar from 'v-calendar'

createApp(App)
	.use(routes)
	.use(Mapbox)
	.use(Vcalendar, {})
	.directive('click-outside', {
		beforeMount: function (el, binding) {
			const ourClickEventHandler = (event) => {
				if (!el.contains(event.target) && el !== event.target) {
					binding.value(event)
				}
			}
			el.__vueClickEventHandler__ = ourClickEventHandler
			document.addEventListener('click', ourClickEventHandler)
		},
		unmounted: function (el) {
			document.removeEventListener('click', el.__vueClickEventHandler__)
		},
	})
	.mount('#app')
