import { AsistenciaDetalle } from '@/models/asistencia'
import { defineStore } from 'pinia'

export const EmployStore = defineStore('employ', {
	state: (): any => ({
		dni: '',
		eventos: [] as Array<Object>,
		registros: [] as AsistenciaDetalle[],
	}),
	actions: {
		changeDni(ndni: string) {
			this.dni = ndni
		},
		addEventos(event: Object) {
			this.eventos.push(event)
		},
		loadRegistros(regi: AsistenciaDetalle[]) {
			regi.forEach((e) => {
				this.registros.push(e)
			})
		},
		searchDia(dia: number): AsistenciaDetalle[] {
			this.registros.forEach((e) => {
				console.log(e)
			})
			return []
		},
	},
})
