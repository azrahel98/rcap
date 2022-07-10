import { defineStore } from 'pinia'

export const EmployStore = defineStore('employ', {
	state: (): any => ({
		dni: '',
	}),
	actions: {
		changeDni(ndni: string) {
			this.dni = ndni
		},
	},
})
