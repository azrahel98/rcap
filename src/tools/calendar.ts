// import { AsistenciaDetalle } from '../../app/models/asistencia'
import { Doc, Papeleta } from '../../app/models/documents'

interface CalInfo {
	dias: number
	fday: number
}

function DiasDelMes(mes: number, año: number): CalInfo {
	var date = new Date(año, mes, 0)
	var frist = new Date(`${año}-${mes}-01`)
	return { dias: date.getDate(), fday: frist.getDay() }
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
			return ['XE', '#a4a858']
		case 'ONOMASTICO':
			return ['ON', 'orange']
		case 'HORASEXTRAS':
			return ['HEX', '#fcba03']
		default:
			return ['ME', '#EE72AA']
	}
}

export {
	// addAtributtes,
	CalInfo,
	DiasDelMes,
	// DiasRegistros,
	DiasDocumentos,
	DiasDocumentosMemo,
	AbrevPermisoP,
	CheckDocsinArray,
}
