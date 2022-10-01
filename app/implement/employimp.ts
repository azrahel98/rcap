import { EmployRepository } from '../repository/employ'
import { MainApi } from '../http/axios'
import { Employ } from '../model/employs'
import moment from 'moment'
import { RelojB } from '../model/asistencia'

class EmployImp implements EmployRepository {
	async buscar_asistencia(dni: string, mes: number): Promise<RelojB[]> {
		try {
			const result = await MainApi.getInstance().post(
				'/doc/marcaciones',
				JSON.stringify({ dni, mes }),
				{
					headers: {
						'Content-Type': 'application/json',
					},
				}
			)
			if (result.status !== 200) throw new Error(result.data)
			const marcaciones: Array<RelojB> = []
			if ((JSON.parse(result.data) as Array<any>).length === 0)
				throw new Error('sin resultados')
			JSON.parse(result.data).forEach((e) => {
				marcaciones.push({
					dni: e.dni,
					hora: e.hora,
					nombre: e.nombre,
					reloj: e.reloj,
					fecha: e.fecha,
				})
			})
			return marcaciones
		} catch (error) {
			throw error
		}
	}
	async buscar_dni(dni: string): Promise<Employ[]> {
		try {
			const result = await MainApi.getInstance().post(
				'/employ/search',
				JSON.stringify({ dni }),
				{
					headers: {
						'Content-Type': 'application/json',
					},
				}
			)
			if (result.status !== 200) throw new Error(result.data)
			const employs: Array<Employ> = []
			if ((JSON.parse(result.data)['data'] as Array<any>).length === 0)
				throw new Error('sin resultados')
			JSON.parse(result.data)['data'].forEach((e) => {
				employs.push({
					area: e.area,
					cargo: e.cargo,
					dni: e.dni,
					horario: e.horario,
					ingreso:
						e.ingreso == null ? null : moment(e.ingreso, 'YYYY-MM-DD').toDate(),
					nombre: e.nombre,
					regimen: e.regimen,
				})
			})
			return employs
		} catch (error) {
			throw error
		}
	}
	async buscar_employName(nombre: string): Promise<Employ[]> {
		try {
			const result = await MainApi.getInstance().post(
				'/employ',
				JSON.stringify({ nombre: nombre }),
				{
					headers: {
						'Content-Type': 'application/json',
					},
				}
			)
			if (result.status !== 200) throw new Error(result.data)
			const employs: Array<Employ> = []
			if ((JSON.parse(result.data)['data'] as Array<any>).length === 0)
				throw new Error('sin resultados')
			JSON.parse(result.data)['data'].forEach((e) => {
				employs.push({
					area: e.area,
					cargo: e.cargo,
					dni: e.dni,
					horario: e.horario,
					ingreso:
						e.ingreso == null ? null : moment(e.ingreso, 'YYYY-MM-DD').toDate(),
					nombre: e.nombre,
					regimen: e.regimen,
				})
			})
			return employs
		} catch (error) {
			throw error
		}
	}
	async empleadosActivos(): Promise<number> {
		try {
			const result = await MainApi.getInstance().get('/employ/count')
			if (result.status !== 200) throw new Error(result.data)
			return JSON.parse(result.data)['cantidad']
		} catch (error) {
			throw error
		}
	}
}

export { EmployImp }
