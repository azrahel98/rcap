function ConverDateToString(fecha: Date): string {
	var month = fecha.getUTCMonth() + 1
	var day = fecha.getDate()
	var year = fecha.getFullYear()
	return `${year}-${month}-${day}`
}
function CheckIsEmpty(descrip: string, detalle: string): boolean {
	if (descrip.length >= 5 && detalle.length >= 1) {
		return true
	}
	return false
}

export { ConverDateToString, CheckIsEmpty }
