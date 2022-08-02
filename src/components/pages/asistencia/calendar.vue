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
		<div class="d-dias">
			<div v-for="l in minfo.fday - 1" />
			<div v-for="x in minfo.dias" class="cald">
				<DiasCard
					:day="x"
					:list="DiasRegistros(x)"
					:papeletas="DiasDocumentos(x - 1, papeletas as any)"
					:docs="DiasDocumentosMemo(x - 1, memos, prop.mes as number)"
					:rangd="CheckDocsinArray(memos, prop.mes as number, x)"
				/>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
	.calendario {
		display: grid;
		grid-template-columns: 1fr;
		column-gap: 2vh;
		height: 100%;
		widows: 100%;
		padding: 1.4vh !important;
		border-radius: 20px;

		.d-semana {
			border-radius: 20px 20px 0 0;
			background-color: #f1557e;
			height: 100%;
			width: 100%;
			display: grid;
			grid-template-columns: repeat(7, 1fr);
			align-items: center;
			justify-content: center;
			h6 {
				text-align: center;
			}
		}
		.d-dias {
			border: 1px solid #cbcee1;
			border-top: none;
			border-radius: 0 0 20px 20px;
			padding: 0.5vh;
			height: 100%;
			display: grid;
			grid-template-columns: repeat(7, 1fr);
			column-gap: 2px;
			row-gap: 3px;
		}
	}
</style>

<script lang="ts" setup>
	import { computed } from '@vue/reactivity'
	import { ref, watchEffect } from 'vue'
	import {
		CalInfo,
		DiasDelMes,
		DiasDocumentos,
		DiasDocumentosMemo,
		CheckDocsinArray,
	} from '../../../tools/calendar'
	import DiasCard from './dias-card.vue'
	const prop = defineProps({
		papeletas: { required: true, type: Array },
		memos: { required: true, type: Array },
		marcaciones: { required: true, type: Array },
		mes: { required: true },
	})
	const minfo = ref<CalInfo>(DiasDelMes(prop.mes as number, 2022))

	watchEffect(() => {
		minfo.value = DiasDelMes(prop.mes as number, 2022)
	})

	function DiasRegistros(dia: number): Array<any> {
		console.log('me ejecturo :v', dia)
		var result = []
		prop.marcaciones.forEach((e) => {
			var d = e['fecha'] as Date
			if (d.getDate() === dia) {
				result.push(e)
			}
		})
		return result
	}
</script>
