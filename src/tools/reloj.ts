import { AsistenciaDetalle } from '../../app/models/asistencia'
import { Doc, Papeleta } from '../../app/models/documents'

function addAtributtes(
	data: AsistenciaDetalle[],
	papes: Papeleta[],
	docs: Doc[]
): Array<any> {
	var atri = []
	data.forEach((e) => {
		atri.push({
			dates: e.fecha,

			customData: {
				title: `${e.marca}`,
				class: 'marca',
			},
			popover: 'true',
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
			// popover: {
			// 	isVisible: true,
			// 	label: `${e.descrip} - ${e.detalle}`,
			// 	visibility: 'hover',
			// },
			customData: {
				title: `${e.nombre} - ${e.tipoP}`,
				class: 'papeleta',
			},
		})
	})
	docs.forEach((e) => {
		if (
			new Date(e.fecha.toString()).getMonth() + 1 ===
			new Date(e.Inicio.toString()).getMonth() + 1
		) {
			if (
				new Date(e.Inicio.toString()).getMonth() + 1 ==
				new Date(e.Fin.toString()).getMonth() + 1
			) {
				atri.push({
					highlight: {
						start: { fillMode: 'outline' },
						base: { fillMode: 'light' },
						end: { fillMode: 'outline' },
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
			} else {
				atri.push({
					highlight: {
						start: { fillMode: 'outline' },
						base: { fillMode: 'light' },
						end: { fillMode: 'outline' },
					},
					dates: {
						start: new Date(
							new Date(e.Inicio.toString()).setDate(
								new Date(e.Inicio.toString()).getDate() + 1
							)
						),
						end: new Date(
							new Date(e.Fin.toString()).getFullYear(),
							new Date(e.Fin.toString()).getMonth() + 1,
							new Date(
								new Date(e.Fin.toString()).getFullYear(),
								new Date(e.Fin.toString()).getMonth() + 1,
								0
							).getDate()
						),
					},
				})
			}
		} else {
			atri.push({
				dot: {
					color: 'teal',
				},
				dates: new Date(
					new Date(e.fecha.toString()).setDate(
						new Date(e.fecha.toString()).getDate() + 1
					)
				),
				customData: {
					title: `${e.doc}`,
					class: 'memorando',
				},
			})
		}
	})

	return atri
}

export { addAtributtes }
