import { AsistenciaDetalle } from '../../app/models/asistencia'
import { Doc, Papeleta } from '../../app/models/documents'

function colorForPermisos(p: String) {
	switch (p) {
		case 'JUSTIFICADO':
			return 'gray'
		case 'AC':
			return 'indigo'
		case 'DF':
			return 'orange'
		default:
			return 'teal'
	}
}

// function dateMonth(date: any) {
// 	var now = new Date(date)
// 	return new Date(now.setDate(now.getDate() + 1)).getMonth()
// }

// function lastDay(d: Date): Date {
// 	return new Date(d.getFullYear(), d.getMonth() + 1, 0)
// }

function addAtributtes(
	data: AsistenciaDetalle[],
	papes: Papeleta[],
	docs: Doc[]
): Array<any> {
	var atri = []

	papes.forEach((e) => {
		atri.push({
			dates: new Date(
				new Date(e.fecha).setDate(new Date(e.fecha).getDate() + 1)
			),
			popover: {
				visibility: 'hover',
			},
			highlight: {
				color: colorForPermisos(e.tipoP),
				fillMode: 'solid',
			},
			customData: {
				papeleta: true,
				nombre: `${e.nombre}`,
				descrip: `${e.descrip}`,
				detalle: `${e.detalle}`,
				tipo: `${e.tipoP}`,
			},
		})
	})
	docs.forEach((e) => {
		if (e.Inicio !== '0000-00-00') {
			atri.push({
				highlight: {
					start: { fillMode: 'light' },
					base: {
						fillMode: 'solid',
						color: colorForPermisos(e.permiso),
					},
					end: { fillMode: 'light' },
				},
				popover: {
					visibility: 'click',
				},
				customData: {
					memo: true,
					nombre: `${e.doc}`,
					descrip: `${e.descrip}`,
					detalle: `${e.Inicio}`,
					tipo: `${e.Fin}`,
				},
				dates: {
					start: new Date(
						new Date(e.Inicio.toString()).setDate(
							new Date(e.Inicio.toString()).getDate() + 1
						)
					),
					end: new Date(
						new Date(e.Fin.toString()).setDate(
							new Date(e.Fin.toString()).getDate() + 1
						)
					),
				},
			})
		}
		atri.push({
			dates: new Date(
				new Date(e.fecha.toString()).setDate(
					new Date(e.fecha.toString()).getDate() + 1
				)
			),
			popover: {
				visibility: 'hover',
			},
			highlight: {
				color: 'teal',
				fillMode: 'outline',
			},
			customData: {
				memo: true,
				nombre: `${e.doc}`,
				descrip: `${e.descrip}`,
				tipo: `${e.permiso}`,
			},
		})
	})
	data.forEach((e) => {
		atri.push({
			dates: e.fecha,
			customData: {
				marca: `${e.marca}`,
				class: 'marca',
				reloj: true,
			},
			popover: {
				visibility: 'hover',
			},
			dot: 'teal',
		})
	})
	return atri
}

export { addAtributtes }
