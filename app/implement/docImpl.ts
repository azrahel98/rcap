import { Doc } from '../model/doc/doc'
import { PP } from '../model/doc/pp'
import { DocRepository } from '../repository/doc_r'
import { MainApi } from '../http/axios'

export class DocImpl implements DocRepository {
	// async buscar_marcaciones(dni: string, mes: number): Promise<RelojB[] | null> {
	// 	throw new Error('ErrorbuscarPapeletas')
	// }
	async buscar_papeletas(dni: string, mes: number): Promise<PP[] | null> {
		try {
			const data = await MainApi.getInstance().post(
				'/doc/pps',
				JSON.stringify({ dni, mes })
			)
			if (data.status !== 200) throw new Error(JSON.parse(data.data)['message'])
			return JSON.parse(data.data) as PP[]
		} catch (error) {
			throw error
		}
	}
	async buscar_documentos(dni: string, mes: number): Promise<Doc[] | null> {
		try {
			const data = await MainApi.getInstance().post(
				'/doc/docs',
				JSON.stringify({ dni, mes })
			)
			if (data.status !== 200) throw new Error(JSON.parse(data.data)['message'])

			return JSON.parse(data.data) as Doc[]
		} catch (error) {
			throw error
		}
	}
	async create_doc(doc: Doc, range: boolean): Promise<Doc | null> {
		try {
			const data = await MainApi.getInstance().post('/doc', JSON.stringify(doc))
			if (data.status !== 200) throw new Error(JSON.parse(data.data)['message'])
			return JSON.parse(data.data) as Doc
		} catch (error) {
			throw error
		}
	}

	async edit_doc(doc: Doc): Promise<Doc> {
		throw new Error('Method not implemented.')
	}
	async delete_doc(docId: number): Promise<number> {
		throw new Error('Method not implemented.')
	}
	async create_pp(pp: PP): Promise<PP | null> {
		try {
			const data = await MainApi.getInstance().post(
				'/doc/ppcreate',
				JSON.stringify(pp)
			)
			console.log(JSON.parse(data.data) as PP)
			if (data.status !== 200) throw new Error(JSON.parse(data.data)['message'])

			return JSON.parse(data.data) as PP
		} catch (error) {
			throw error
		}
	}
	async edit_pp(pp: PP): Promise<Doc> {
		throw new Error('Method not implemented.')
	}
	async delete_pp(ppId: number): Promise<number> {
		throw new Error('Method not implemented.')
	}

	check(ob: Record<string, any>): boolean {
		return Object.keys(ob).length === 0
	}
}
