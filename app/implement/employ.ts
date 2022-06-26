import gql from 'graphql-tag'
import { Employ } from '../models/employ'
import { EmployRep } from '../repository/employ'
import { Client } from '../service/graphl'

export default class EmployImpl implements EmployRep {
	async buscar_nombre(nombre: string): Promise<Employ[] | null> {
		try {
			var query = gql`
            {
                empleados_search(nombre: "${nombre}") {
                    nombre
                    cargo
                    dni
                }
            }
              `
			const result = await Client.query({ query })
			const data = [] as Employ[]
			result.data.empleados_search.forEach((e) => {
				data.push({ cargo: e.cargo, dni: e.dni, nombre: e.nombre })
			})
			return data
		} catch (error) {
			console.log(error)
			return null
		}
	}
}
