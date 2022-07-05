import { AsistenciaDetalle } from '../models/asistencia'
import { Employ } from '../models/employ'

export interface EmployRep {
	buscar_nombre(nombre: string): Promise<Employ[] | null>
	buscar_pordni(dni: string): Promise<Employ | null>
	buscar_asistencia(
		dni: string,
		mes: string
	): Promise<AsistenciaDetalle[] | null>
}
