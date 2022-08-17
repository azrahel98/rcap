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

interface CalInfo {
	dias: number
	fday: number
}

function DiasDelMes(mes: number, año: number): CalInfo {
	var date = new Date(año, mes, 0)
	var frist = new Date(`${año}-${mes}-01`)
	return { dias: date.getDate(), fday: frist.getDay() }
}

function DiasRegistros(dia: number, list: Array<any>) {
	var result = []
	list.forEach((e) => {
		var d = e.fecha as Date
		if (d.getDate() === dia) {
			result.push(e)
		}
	})
	return result
}

function DiasDocumentos(dia: number, list: Array<any>) {
	var result = []
	list.forEach((e) => {
		var d = new Date(new Date(e.fecha.toString()).getTime() + 86400000)
		if (d.getDate() === dia) {
			result.push(e)
		}
	})
	return result
}
function DiasDocumentosMemo(dia: number, list: Array<Doc>, mes: number) {
	var result = []
	list.forEach((e) => {
		var d = new Date(e.fecha.toString())
		if (d.getDate() === dia && d.getMonth() + 1 == mes) {
			result.push(e)
		}
	})
	return result
}
function CheckDocsinArray(list: Array<Doc>, mes: number, day: number) {
	var result = []
	list.forEach((e) => {
		if (e.Fin !== '0000-00-00' || e.Inicio !== '0000-00-00') {
			var di = new Date(new Date(e.Inicio.toString()).getTime() + 86400000)
			var df = new Date(new Date(e.Fin.toString()).getTime() + 86400000)
			if (di.getMonth() + 1 == mes && df.getMonth() + 1 == mes) {
				if (day >= di.getDate() && day <= df.getDate()) {
					result.push(e)
				}
			} else if (di.getMonth() + 1 == mes && df.getMonth() + 1 != mes) {
				if (di.getDate() <= day) {
					result.push(e)
				}
			} else if (di.getMonth() + 1 < mes && df.getMonth() + 1 == mes) {
				if (df.getDate() >= day) {
					result.push(e)
				}
			} else if (di.getMonth() + 1 < mes && df.getMonth() + 1 > mes) {
				result.push(e)
			}
		}
	})
	return result
}

function AbrevPermisoP(long: string) {
	switch (long) {
		case 'DF':
			return ['DF', '#9E5140']
		case 'AC':
			return ['AC', '#F0CB4D']
		case 'JUSTIFICADO':
			return ['JU', '#82BDD6']
		case 'OMISION':
			return ['OM', '#D77EF1']
		case 'DFXHEL':
			return ['XE', '#F97901']
		case 'ONOMASTICO':
			return ['ON', 'orange']
		default:
			return ['ME', '#EE72AA']
	}
}

export {
	addAtributtes,
	CalInfo,
	DiasDelMes,
	DiasRegistros,
	DiasDocumentos,
	DiasDocumentosMemo,
	AbrevPermisoP,
	CheckDocsinArray,
}
