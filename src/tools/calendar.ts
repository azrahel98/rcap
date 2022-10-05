interface CalInfo {
	dias: number
	fday: number
}

function DiasDelMes(mes: number, año: number): CalInfo {
	var date = new Date(año, mes, 0)
	var frist = new Date(`${año}-${mes + 1}-01`)
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

function MesString(mes: number): string {
	switch (mes) {
		case 1:
			return 'Enero'
		case 2:
			return 'Febrero'
		case 3:
			return 'Marzo'
		case 4:
			return 'Abril'
		case 5:
			return 'Mayo'
		case 6:
			return 'Junio'
		case 7:
			return 'Julio'
		case 8:
			return 'Agosto'
		case 9:
			return 'Septiembre'
		case 10:
			return 'Octubre'
		case 11:
			return 'Noviembre'

		default:
			return 'Diciembre'
	}
}

export {
	// addAtributtes,
	CalInfo,
	DiasDelMes,
	// DiasRegistros,
	DiasDocumentos,
	MesString,
}
