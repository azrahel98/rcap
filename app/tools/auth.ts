import { AsistenciaDetalle } from '../models/asistencia'

function AgregarDias(l: AsistenciaDetalle[]): Array<Object> {
	const data = []
	var d = l[0].fecha.split('-')
	var n = new Date(parseInt(d[0]), parseInt(d[1]) - 1, parseInt(d[2]))
	for (let i = 0; i < l.length; i++) {
		var d = l[i].fecha.split('-')
		var n = new Date(parseInt(d[0]), parseInt(d[1]) - 1, parseInt(d[2]))
		data.push({
			key: i,
			customData: {
				title: `${l[i].marca}`,
				class: 'vc-detalle',
			},
			dates: n,
		})
	}
	return data
}

export { AgregarDias }
