import jwtDecode from 'jwt-decode'
import { defineStore } from 'pinia'

export const userStore = defineStore('user', {
	state: (): any => ({
		admin: false,
	}),
	actions: {
		InitAdmin() {
			var token = localStorage.getItem('auth')
			this.admin = jwtDecode(token)['admin']
			console.log(jwtDecode(token))
		},
	},

	getters: {
		checkisAdmin: async () => {
			var token = localStorage.getItem('auth')
			return (await jwtDecode(token)['admin']) as boolean
		},
	},
})
