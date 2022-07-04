import path from 'path'
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import LoginImp from '../../app/implement/login'

const routes: RouteRecordRaw[] = [
	{
		component: () => import('../views/login.vue'),
		name: 'login',
		path: '/login',
		beforeEnter: (to, from, next) => {
			const loged = new LoginImp().ckeck()
			if (loged) {
				next('/')
				return
			}
			next()
		},
	},
	{
		component: () => import('../views/external.vue'),
		name: 'external',
		path: '/:dni/t',
		props: true,
	},
	{
		component: () => import('../views/dash.vue'),
		name: 'dash',
		path: '/',
		beforeEnter: (to, from, next) => {
			const loged = new LoginImp().ckeck()
			if (!loged) {
				next('/login')
				return
			}
			next()
		},
		children: [
			{
				component: () => import('../views/pages/home.vue'),
				name: 'home',
				path: '/',
			},
			{
				component: () => import('../views/pages/employees.vue'),
				name: 'employees',
				path: '/employees',
			},
			{
				component: () => import('../views/pages/memorando.vue'),
				name: 'memo',
				path: '/memo',
			},
		],
	},
	{
		component: () => import('../views/error.vue'),
		path: '/:pathMatch(.*)*',
		name: 'notfound',
	},
]

const router = createRouter({
	history: createWebHistory(),
	routes,
	linkExactActiveClass: 'exact-active',
})

export default router
