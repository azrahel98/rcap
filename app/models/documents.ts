interface Papeleta {
	id?: string | null
	detalle?: string | null
	descrip?: string | null
	dni?: string | null
	fecha?: string | null
	nombre?: string | null
	retorno?: string | null
	tipoP?: string | null
}
interface Doc {
	id?: String | null
	doc?: String | null
	dni?: String | null
	fecha?: String | null
	tipo?: String | null
	permiso?: String | null
	descrip?: String | null
	Ref?: String | null
	Inicio?: String | null
	Fin?: String | null
}

export { Papeleta, Doc }
