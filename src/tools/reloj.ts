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

function dateMonth(date: any) {
	var now = new Date(date)
	return new Date(now.setDate(now.getDate() + 1)).getMonth()
}

function lastDay(d: Date): Date {
	return new Date(d.getFullYear(), d.getMonth() + 1, 0)
}

function addAtributtes(
	data: AsistenciaDetalle[],
	papes: Papeleta[],
	docs: Doc[]
): Array<any> {
	console.log(docs)
	var atri = []
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
				fillMode: 'outline',
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
		console.log(e)
		if (dateMonth(e.Inicio) == dateMonth(e.Fin)) {
			atri.push({
				highlight: {
					start: { fillMode: 'outline' },
					base: {
						fillMode: 'light',
						color: colorForPermisos(e.permiso),
					},
					end: { fillMode: 'outline' },
				},
				popover: {
					visibility: 'hover',
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
		} else if (dateMonth(e.Fin) > dateMonth(e.Inicio)) {
			atri.push({
				highlight: {
					start: { fillMode: 'outline' },
					base: {
						fillMode: 'light',
						color: colorForPermisos(e.permiso),
					},
					end: { fillMode: 'outline' },
				},
				popover: {
					visibility: 'hover',
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
					end: lastDay(new Date(e.Inicio.toString())),
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
				color: colorForPermisos(e.permiso),
				fillMode: 'solid',
			},
			customData: {
				memo: true,
				nombre: `${e.doc}`,
				descrip: `${e.descrip}`,
				detalle: `${e.Ref}`,
				tipo: `${e.permiso}`,
			},
		})
	})
	// docs.forEach((e) => {
	// 	if (
	// 		new Date(e.fecha.toString()).getMonth() + 1 ===
	// 		new Date(e.Inicio.toString()).getMonth() + 1
	// 	) {
	// 		if (
	// 			new Date(e.Inicio.toString()).getMonth() + 1 ==
	// 			new Date(e.Fin.toString()).getMonth() + 1
	// 		) {
	// 			atri.push({
	// 				highlight: {
	// 					start: { fillMode: 'outline' },
	// 					base: { fillMode: 'light' },
	// 					end: { fillMode: 'outline' },
	// 				},
	// 				dates: {
	// 					start: new Date(
	// 						new Date(e.Inicio.toString()).setDate(
	// 							new Date(e.Inicio.toString()).getDate() + 1
	// 						)
	// 					),
	// 					end: new Date(
	// 						new Date(e.Fin.toString()).setDate(
	// 							new Date(e.Fin.toString()).getDate() + 1
	// 						)
	// 					),
	// 				},
	// 			})
	// 		} else {
	// 			atri.push({
	// 				highlight: {
	// 					start: { fillMode: 'outline' },
	// 					base: { fillMode: 'light' },
	// 					end: { fillMode: 'outline' },
	// 				},
	// 				dates: {
	// 					start: new Date(
	// 						new Date(e.Inicio.toString()).setDate(
	// 							new Date(e.Inicio.toString()).getDate() + 1
	// 						)
	// 					),
	// 					end: new Date(
	// 						new Date(e.Fin.toString()).getFullYear(),
	// 						new Date(e.Fin.toString()).getMonth() + 1,
	// 						new Date(
	// 							new Date(e.Fin.toString()).getFullYear(),
	// 							new Date(e.Fin.toString()).getMonth() + 1,
	// 							0
	// 						).getDate()
	// 					),
	// 				},
	// 			})
	// 		}
	// 	} else {
	// 		atri.push({
	// 			dot: {
	// 				color: 'teal',
	// 			},
	// 			dates: new Date(
	// 				new Date(e.fecha.toString()).setDate(
	// 					new Date(e.fecha.toString()).getDate() + 1
	// 				)
	// 			),
	// 			customData: {
	// 				title: `${e.doc}`,
	// 				class: 'memorando',
	// 			},
	// 		})
	// 	}
	// })

	return atri
}

export { addAtributtes }
