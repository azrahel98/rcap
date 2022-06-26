import { Employ } from '../models/employ'

export interface EmployRep {
	buscar_nombre(nombre: string): Promise<Employ[] | null>
}
