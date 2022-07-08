import { Doc, Papeleta } from '../models/documents'

export interface DocsRep {
	creaer_papeleta(papeleta: Papeleta): Promise<string | null>
	crear_docs(memo: Doc, isrange: boolean): Promise<string | null>
	buscar_papeletas(dni:string,mes:number):Promise<Papeleta[] | null>
}
