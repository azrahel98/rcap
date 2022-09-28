interface Doc {
	docId?: number
	dni?: string
	nombre?: string
	fecha?: Date
	doct?: string
	docpe?: string
	descr?: string
	ref?: string
	inicio?: string | null
	fin?: string | null
	activo?: boolean
}

export { Doc }
