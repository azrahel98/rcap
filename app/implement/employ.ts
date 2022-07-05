import gql from 'graphql-tag'
import { Employ } from '../models/employ'
import { EmployRep } from '../repository/employ'
import { Client } from '../service/graphl'
import router from '../../src/router/router'
import { AsistenciaDetalle } from '../models/asistencia'

export default class EmployImpl implements EmployRep {
	async buscar_asistencia(
		dni: string,
		mes: string
	): Promise<AsistenciaDetalle[]> {
		try {
			var query = gql`
				query  {
					buscar_asistencia(dni: "${dni}", mes: ${mes}) {
						fecha
						hora
					}
				}
			`
			var result = await Client.query({ query })
			var data = [] as AsistenciaDetalle[]
			result.data.buscar_asistencia.forEach((e) => {
				data.push({
					fecha: e.fecha,
					marca: e.hora,
					dni: null,
					marca3: null,
					reloj: null,
					marca2: null,
				})
			})
			return data
		} catch (error) {
			console.log(error)
			return null
		}
	}
	async buscar_pordni(dni: string): Promise<Employ> {
		try {
			var query = gql`
				query {
					empleadoByDNI(dni: "${dni}") {
						nombre
						cargo
						area
						ingreso
					}
				}
			`
			const result = await Client.query({ query })
			return {
				nombre: result.data.empleadoByDNI.nombre,
				cargo: result.data.empleadoByDNI.cargo,
				area: result.data.empleadoByDNI.area,
				ingreso: result.data.empleadoByDNI.ingreso,
			}
		} catch (error) {
			await router.push({ name: 'notfound' })
		}
	}
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
			return null
		}
	}
}
