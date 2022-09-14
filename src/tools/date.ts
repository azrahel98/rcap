function GetStrinDate(): Array<string> {
	var now = new Date()
	var dayString = ''
	var mes = ''
	var result = []
	switch (now.getDay()) {
		case 0:
			dayString = 'Domingo'
			break
		case 1:
			dayString = 'Lunes'
			break
		case 2:
			dayString = 'Martes'
			break
		case 3:
			dayString = 'Miercoles'
			break
		case 4:
			dayString = 'Jueves'
			break
		case 5:
			dayString = 'Viernes'
			break
		default:
			dayString = 'Sabado'
			break
	}
	switch (now.getMonth()) {
		case 0:
			mes = 'Enero'
			break
		case 1:
			mes = 'Febrero'
			break
		case 2:
			mes = 'Marzo'
			break
		case 3:
			mes = 'Abril'
			break
		case 4:
			mes = 'Mayo'
			break
		case 5:
			mes = 'Junio'
			break
		case 6:
			mes = 'Julio'
			break
		case 7:
			mes = 'Agosto'
			break
		case 8:
			mes = 'Septiembre'
			break
		case 9:
			mes = 'Octubre'
			break
		case 10:
			mes = 'Noviembre'
			break
		default:
			mes = 'Diciembre'
			break
	}
	result.push(dayString)
	result.push(`${now.getDate()} de ${mes} , ${now.getFullYear()}`)
	return result
}

function getNameOfMonth(mes: number): string {
	switch (mes) {
		case 1:
			return 'ENERO'
		case 2:
			return 'FEBRERO'
		case 3:
			return 'MARZO'
		case 4:
			return 'ABRIL'
		case 5:
			return 'MAYO'
		case 6:
			return 'JUNIO'
		case 7:
			return 'JULIO'
		case 8:
			return 'AGOSTO'
		case 9:
			return 'SEPTIEMBRE'
		case 10:
			return 'OCTUBRE'
		case 11:
			return 'NOVIEMBRE'
		default:
			return 'DICIEMBRE'
	}
}

export { GetStrinDate, getNameOfMonth }
