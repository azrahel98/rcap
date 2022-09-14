<template>
	<div class="calendario">
		<div class="d-semana">
			<h6>L</h6>
			<h6>M</h6>
			<h6>Mi</h6>
			<h6>J</h6>
			<h6>V</h6>
			<h6>S</h6>
			<h6>D</h6>
		</div>
		<div class="d-dias" v-if="!load">
			<div v-for="l in minfo.fday - 1" />
			<div v-for="x in minfo.dias" class="cald">
				<DiasCard
					:day="x"
					:list="DiasRegistros(x)"
					:papeletas="DiasDocumentos(x , pap as any)"
					:docs="DiasDocumentosMemo(x - 1, dc, prop.mes as number)"
					:rangd="CheckDocsinArray(dc, prop.mes as number, x)"
				/>
			</div>
		</div>
		<lotie
			v-else
			class="lotie"
			animation-link="https://assets1.lottiefiles.com/temporary_files/PH5YkW.json"
		/>
	</div>
</template>

<style lang="scss" scoped>
	.calendario {
		display: flex;
		flex-direction: column;
		height: 100%;
		gap: 0.5vh;
		padding: 0 2vh 5vh 2vh;
		.d-semana {
			border-radius: 20px 20px 0 0;
			background-color: $color-primary;
			color: $color-white;
			display: grid;
			grid-template-columns: repeat(7, 1fr);
			align-items: center;
			justify-content: center;
			h6 {
				text-align: center;
			}
			height: 3.4vh;
		}
		.d-dias {
			border: 1px solid $color-white;
			border-top: none;
			border-radius: 0 0 20px 20px;
			display: grid;
			grid-template-columns: repeat(7, 1fr);
			column-gap: 2px;
			row-gap: 3px;
			height: 100%;
		}
		.lotie {
			background-color: $color-white;
		}
	}
</style>

<script lang="ts" setup>
	import DocsImpl from '@/implement/docs'
	import EmployImpl from '@/implement/employ'

	import { AsistenciaDetalle } from '@/models/asistencia'
	import { Doc, Papeleta } from '@/models/documents'
	import { ref, onMounted, watch, watchEffect } from 'vue'
	import {
		CalInfo,
		DiasDelMes,
		DiasDocumentos,
		DiasDocumentosMemo,
		CheckDocsinArray,
	} from '../../../tools/calendar'

	import { Vue3Lottie as lotie } from 'vue3-lottie'

	import DiasCard from './dias-card.vue'

	const prop = defineProps({
		mes: { required: true },
		dni: { required: false, type: String },
	})

	const em = new EmployImpl()
	const ds = new DocsImpl()

	const minfo = ref<CalInfo>(DiasDelMes(prop.mes as number, 2022))

	const marc = ref<AsistenciaDetalle[]>([])
	const pap = ref<Papeleta[]>([])
	const dc = ref<Doc[]>([])

	const e = defineEmits(['completed'])

	const load = ref(true)

	onMounted(async () => {
		marc.value = await em.buscar_asistencia(prop.dni, prop.mes.toString())
		pap.value = await ds.buscar_papeletas(prop.dni, prop.mes as number)
		dc.value = await ds.buscar_docs(prop.dni, prop.mes as number)
		load.value = !load.value
	})

	watch(prop, async (s) => {
		load.value = !load.value
		marc.value = await em.buscar_asistencia(s.dni, s.mes.toString())
		pap.value = await ds.buscar_papeletas(s.dni, s.mes as number)
		dc.value = await ds.buscar_docs(s.dni, s.mes as number)
		minfo.value = DiasDelMes(s.mes as number, 2022)
		load.value = !load.value
	})

	watchEffect(() => {
		e('completed', load.value)
	})

	function DiasRegistros(dia: number): Array<any> {
		var result = []
		marc.value.forEach((e) => {
			var d = e['fecha'] as Date
			if (d.getDate() === dia) {
				result.push(e)
			}
		})
		return result
	}
</script>
