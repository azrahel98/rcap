import { AsistenciaDetalle } from '../models/asistencia'
import { Papeleta } from '../models/documents'
import { Employ } from '../models/employ'

export interface AuthRepo {
	buscar_asistencia(token: string): Promise<AsistenciaDetalle[] | null>
	papeletas_bydni(token: string): Promise<Papeleta | null>
	detalles_employ(token: string): Promise<Employ | null>
}
