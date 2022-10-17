import moment from 'moment'
import { MainApi } from '../http/axios'
import { AsistenciaD } from '../model/asistencia'
import { AsistenciaRepo } from '../repository/asistencia'

export class AsistenciaImp implements AsistenciaRepo {
    async add(asis: AsistenciaD): Promise<AsistenciaD | null> {
        try {
            console.log(asis.fecha)
            const data = await MainApi.getInstance().post(
                '/asist/',
                JSON.stringify({
                    asist: {
                        dni: asis.dni,
                        fecha: moment(asis.fecha).format('YYYY-MM-DD'),
                        tardanza: asis.tardanza,
                        acuenta: asis.acuenta,
                        detalle: asis.detalle,
                        falta: asis.falta,
                    },
                })
            )
            if (data.status !== 200) throw new Error(JSON.parse(data.data)['message'])
            return JSON.parse(data.data) as AsistenciaD
        } catch (error) {
            throw error
        }
    }
    async edit(asis: AsistenciaD): Promise<AsistenciaD> {
        throw new Error('Method not implemented.')
    }
    async delete(id: number): Promise<number> {
        throw new Error('Method not implemented.')
    }
    async search(
        dni: string,
        mes: number,
        año: number
    ): Promise<AsistenciaD[] | null> {
        try {
            const data = await MainApi.getInstance().post(
                '/asist/search',
                JSON.stringify({
                    dni,
                    mes,
                    año,
                })
            )
            if (data.status !== 200) throw new Error(JSON.parse(data.data)['message'])
            return JSON.parse(data.data) as AsistenciaD[]
        } catch (error) {
            throw error
        }
    }
}
