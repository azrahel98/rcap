import { Papeleta } from '../models/documents'

export interface DocsRep {
	creaer_papeleta(papeleta: Papeleta): Promise<string | null>
}
