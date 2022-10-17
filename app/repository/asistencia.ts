import { AsistenciaD } from '../model/asistencia'

interface AsistenciaRepo {
    add(asis: AsistenciaD): Promise<AsistenciaD | null>
    edit(asis: AsistenciaD): Promise<AsistenciaD>
    delete(id: number): Promise<number>
    search(dni: string, mes: number, año: number): Promise<AsistenciaD[] | null>
}

export { AsistenciaRepo }