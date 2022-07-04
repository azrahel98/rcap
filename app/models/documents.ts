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
	dni?: String
	doc?: String
	fecha?: String
	tipo?: String
	permiso?: String
	descrip?: String
	Ref?: String
	Inicio?: String
	Fin?: String
}

export { Papeleta, Doc }
