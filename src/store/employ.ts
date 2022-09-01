import { defineStore } from 'pinia'

export const EmployStore = defineStore('employ', {
	state: () => {
		return {
			employs: [],
		}
	},
	actions: {
		addEmploy(e: object) {
			if (this.employs.length == 0) {
				this.employs.push(e)
				return
			}
			if (this.employs.length !== 0) {
				if (this.employs.find((em) => em['dni'] == e['dni']) == undefined) {
					this.employs.push(e)
				}
				return
			}
		},
	},
})
