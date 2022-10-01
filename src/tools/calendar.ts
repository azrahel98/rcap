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

export {
	// addAtributtes,
	CalInfo,
	DiasDelMes,
	// DiasRegistros,
	DiasDocumentos,
}
