import { Employ } from '../model/employs'

interface EmployRepository {
	empleadosActivos(): Promise<number | null>
	buscar_employName(nombre: string): Promise<Employ[] | null>
}

export { EmployRepository }
