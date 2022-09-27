import { EmployRepository } from '../repository/employ'
import { MainApi } from '../http/axios'
import { Employ } from '../model/employs'
import moment from 'moment'

class EmployImp implements EmployRepository {
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
