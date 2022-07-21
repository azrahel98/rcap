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
	): Promise<AsistenciaDetalle[] | null> {
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
					fecha: new Date(
						new Date(e.fecha).setDate(new Date(e.fecha).getDate() + 1)
					),
					marca: e.hora,
				})
			})
			data.sort(function (a, b) {
				var hora1 = a.marca.split(':')
				var hora2 = b.marca.split(':')
				return (
					a.fecha.getTime() - b.fecha.getTime() &&
					parseInt(hora1[0]) * 3600 +
						parseInt(hora1[2]) * 60 -
						(parseInt(hora2[0]) * 3600 + parseInt(hora2[2]) * 60)
				)
			})
			return data
		} catch (error) {
			return []
		}
	}
	async buscar_pordni(dni: string): Promise<Employ | null> {
		try {
			var query = gql`
				query {
					empleadoByDNI(dni: "${dni}") {
						dni
						nombre
						cargo
						area
						ingreso
					}
				}
			`
			const result = await Client.query({ query })
			return {
				dni: result.data.empleadoByDNI.dni,
				nombre: result.data.empleadoByDNI.nombre,
				cargo: result.data.empleadoByDNI.cargo,
				area: result.data.empleadoByDNI.area,
				ingreso: result.data.empleadoByDNI.ingreso,
			}
		} catch (error) {
			await router.push({ name: 'notfound' })
			return null
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
					area
					ingreso
                }
            }
              `
			const result = await Client.query({ query })
			const data = [] as Employ[]
			result.data.empleados_search.forEach((e) => {
				data.push({
					cargo: e.cargo,
					dni: e.dni,
					nombre: e.nombre,
					area: e.area,
					ingreso: e.ingreso,
				})
			})
			return data
		} catch (error) {
			return null
		}
	}
}
