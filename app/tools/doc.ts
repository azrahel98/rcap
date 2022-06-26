function ConverDateToString(fecha: Date): string {
	var month = fecha.getUTCMonth()
	var day = fecha.getDate()
	var year = fecha.getFullYear()
	return `${year}-${month}-${day}`
}
function CheckIsEmpty(
	nombre: string,
	descrip: string,
	detalle: string
): boolean {
	if (descrip.length >= 5 && detalle.length >= 4) {
		return true
	}
	return false
}

export { ConverDateToString, CheckIsEmpty }
