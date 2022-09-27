import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { LoginImp } from '../../app/implement/loginImp'

const routes: RouteRecordRaw[] = [
	{
		component: () => import('../views/login.vue'),
		name: 'login',
		path: '/login',
		beforeEnter: (to, from, next) => {
			const loged = new LoginImp().check()
			if (loged) {
				next('/')
				return
			}
			next()
		},
	},
	{
		component: () => import('../views/root.vue'),
		name: 'dash',
		path: '/',
		beforeEnter: (to, from, next) => {
			const loged = new LoginImp().check()
			if (!loged) {
				next('/login')
				return
			}
			next()
		},
		children: [
			{
				component: () => import('../views/pages/search.vue'),
				name: 'home',
				path: '/',
			},
			{
				component: () => import('../views/pages/employ.vue'),
				name: 'employ',
				path: '/employ',
			},
			{
				component: () => import('../views/pages/detail.vue'),
				name: 'asistencia',
				path: '/asistencia/:dni',
				props: true,
			},
		],
	},
	// {
	// 	component: () => import('../views/error.vue'),
	// 	path: '/:pathMatch(.*)*',
	// 	name: 'notfound',
	// },
]

const router = createRouter({
	history: createWebHistory(),
	routes,
	linkExactActiveClass: 'exact-active',
})

export default router
