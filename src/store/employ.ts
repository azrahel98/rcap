import { defineStore } from 'pinia'

export const EmployStore = defineStore('employ', {
	state: () => {
		return {
			employs: [],
		}
	},
	actions: {
		addEmploy(e: object) {
			this.employs.push(e)
		},
	},
})
