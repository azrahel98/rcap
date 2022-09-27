import { Doc } from '../model/doc/doc'
import { PP } from '../model/doc/pp'

interface DocRepository {
	// documentos
	create_doc(doc: Doc, range: boolean): Promise<Doc | null>
	edit_doc(doc: Doc): Promise<Doc>
	delete_doc(docId: number): Promise<number>
	//papeletas
	create_pp(pp: PP): Promise<PP | null>
	edit_pp(pp: PP): Promise<Doc>
	delete_pp(ppId: number): Promise<number>
	//
	buscar_documentos(dni: string, mes: number): Promise<Doc[] | null>
	buscar_papeletas(dni: string, mes: number): Promise<PP[] | null>
	//buscarAsistencia
}

export { DocRepository }
