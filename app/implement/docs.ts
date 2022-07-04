import { GraphQLError } from 'graphql'
import gql from 'graphql-tag'
import { Doc, Papeleta } from '../models/documents'
import { DocsRep } from '../repository/docs'
import { Client } from '../service/graphl'

export default class DocsImpl implements DocsRep {
	async crear_docs(memo: Doc, isrange: boolean): Promise<string> {
		try {
			var query = gql`
				mutation {
					crear_doc(
						input: {
							dni: "${memo.dni}"
							descrip: "${memo.descrip}"
							doc: "${memo.doc}"
							fecha: "${memo.fecha}"
							permiso: ${memo.permiso}
							range: ${isrange.toString()}
							Ref: "${memo.Ref}"
							tipo: ${memo.tipo}
							Fin: "${memo.Fin}"
							Inicio: "${memo.Inicio}"
						}
					) {
						id
					}
				}
			`

			var data = await Client.mutate({
				mutation: query,
				fetchPolicy: 'no-cache',
			})
			return data.data.crear_doc.id
		} catch (error) {
			throw new Error((error as GraphQLError).message)
		}
	}
	async creaer_papeleta(papeleta: Papeleta): Promise<string | null> {
		try {
			var query = gql`
				mutation {
					crear_papeleta(input: {
			            descrip: "${papeleta.descrip}",
			            detalle: "${papeleta.detalle}",
			            empleado: "${papeleta.dni}",
			            fecha: "${papeleta.fecha}",
			            nombre: "${papeleta.nombre}",
			            retorno: ${papeleta.retorno},
			            tipoP: ${papeleta.tipoP}
			        }) {
						id
					}
				}
			`
			const result = await Client.mutate({
				mutation: query,
				fetchPolicy: 'no-cache',
			})
			return result.data.crear_papeleta.id
		} catch (error) {
			console.log(error)
			return null
		}
	}
	// async buscar_nombre(nombre: string): Promise<Employ[]> {
	// 	try {
	// 		var query = gql`
	//         {
	//             empleados_search(nombre: "${nombre}") {
	//                 nombre
	//                 cargo
	//                 dni
	//             }
	//         }
	//           `
	// 		const result = await Client.query({ query })
	// 		const data = [] as Employ[]
	// 		result.data.empleados_search.forEach((e) => {
	// 			data.push({ cargo: e.cargo, dni: e.dni, nombre: e.nombre })
	// 		})
	// 		return data
	// 	} catch (error) {
	// 		console.log(error)
	// 		return null
	// 	}
	// }
}
