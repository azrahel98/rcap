import { RelojB } from '../model/asistencia'
import { Employ } from '../model/employs'

interface EmployRepository {
	empleadosActivos(): Promise<number | null>
	buscar_employName(nombre: string): Promise<Employ[] | null>
	buscar_dni(dni: string): Promise<Employ[] | null>
	buscar_asistencia(dni: string, mes: number): Promise<RelojB[] | null>
}

export { EmployRepository }
