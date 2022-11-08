import jwtDecode from 'jwt-decode'
import { defineStore } from 'pinia'

export const userStore = defineStore('user', {
	state: (): any => ({
		admin: false,
	}),
	actions: {
		InitAdmin() {
			var token = localStorage.getItem('token')
			if (token) {
				this.admin = (jwtDecode(token) as any)['admin'] == 'Y' ? true : false
			}
		},
	},
})
