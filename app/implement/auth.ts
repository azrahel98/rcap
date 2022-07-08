import { AsistenciaDetalle } from '../models/asistencia'
import { Papeleta } from '../models/documents'
import { Employ } from '../models/employ'
import { AuthRepo } from '../repository/auth'

export default class AuthImpl implements AuthRepo {
	async detalles_employ(token: string): Promise<Employ> {
		var url =
			'https://17jjon4f9f.execute-api.sa-east-1.amazonaws.com/Prod/employ/'
		var result = await fetch(`${url}${token}`)
		var data = await result.json()
		var body = {} as Employ
		body.dni = data.Dni
		body.nombre = data.Nombre
		body.ingreso = data.Ingreso
		body.area = data.Area
		body.cargo = data.Cargo
		body.regimen = data.Regimen
		return body
	}
	async buscar_asistencia(token: string): Promise<AsistenciaDetalle[]> {
		var url =
			'https://17jjon4f9f.execute-api.sa-east-1.amazonaws.com/Prod/asist/'
		var result = await fetch(`${url}${token}`)
		var data = [] as AsistenciaDetalle[]
		const body = await result.json()

		body.forEach((e) => {
			data.push({
				fecha: e.fecha,
				marca: e.hora,
				
			})
		})

		return data
	}
	papeletas_bydni(token: string): Promise<Papeleta> {
		throw new Error('Method not implemented.')
	}
}
