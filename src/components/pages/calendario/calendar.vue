<template>
	<div class="calendario">
		<div class="mesactions"></div>
		<div class="calendar">
			<div class="d-semana">
				<h6>L</h6>
				<h6>M</h6>
				<h6>Mi</h6>
				<h6>J</h6>
				<h6>V</h6>
				<h6>S</h6>
				<h6>D</h6>
			</div>
			<div class="d-dias">
				<div v-for="l in frisday() - 1" />
				<div v-for="x in new Date(2022, prop.mes, 0).getDate()" class="cald">
					<Dias
						:day="x"
						:list="marc.filter((e) => moment(e.fecha).date() + 1 == x)"
						:papeletas="pps.filter((e) => moment(e.fecha).date() + 1 == x)"
						:documentos="docs.filter((e) => moment(e.fecha).date() + 1 == x)"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
	import { DocImpl } from '@/implement/docImpl'
	import { EmployImp } from '@/implement/employimp'
	import { RelojB } from '@/model/asistencia'
	import { Doc } from '@/model/doc/doc'
	import { PP } from '@/model/doc/pp'
	import moment from 'moment'
	import { onMounted, reactive, ref } from 'vue'
	import Dias from './dias.vue'

	const empimp = new EmployImp()
	const docimp = new DocImpl()
	const currentMonth = ref<number>(8)

	const prop = defineProps({
		dni: { required: true, type: String },
		mes: { type: Number },
	})

	const pps = ref<PP[]>([])
	const docs = ref<Doc[]>([])
	const marc = ref<RelojB[]>([])

	onMounted(async () => {
		marc.value = await empimp.buscar_asistencia(prop.dni, 8)

		docs.value = await docimp.buscar_documentos(prop.dni, 8)
		pps.value = await docimp.buscar_papeletas(prop.dni, 8)
	})

	const frisday = () => {
		return new Date(`2022-${prop.mes}-01`).getDay()
	}
</script>
<style lang="scss" scoped>
	.calendar {
		margin: auto;
		display: flex;
		flex-direction: column;
		height: 100%;
		gap: 0.5vh;
		max-width: 1300px;

		.d-semana {
			border-radius: 20px 20px 0 0;
			display: grid;
			grid-template-columns: repeat(7, 1fr);
			align-items: center;
			justify-content: center;
			background-color: rgb(223, 89, 89);

			h6 {
				text-align: center;
			}
			height: 3.4vh;
		}
		.d-dias {
			border-radius: 0 0 20px 20px;
			display: grid;
			grid-template-columns: repeat(7, 1fr);
			column-gap: 2px;
			row-gap: 3px;
			height: 100%;
		}
	}
</style>
