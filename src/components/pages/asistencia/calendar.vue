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
			<div v-for="x in minfo.dias">
				<DiasCard :day="x" />
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
	.calendario {
		display: grid;
		grid-template-rows: 5vh auto;
		grid-template-columns: 1fr;
		column-gap: 2vh;
		row-gap: 1vh;
		height: 100%;
		padding: 1.4vh !important;
		border-radius: 20px;
		.d-semana {
			align-self: center;
			background-color: red;
			border-radius: 20px 20px 0 0;
			height: 100%;
			display: grid;
			grid-template-columns: repeat(7, 1fr);
			align-items: center;
			h6 {
				text-align: center;
			}
		}
		.d-dias {
			height: 100%;
			display: grid;
			grid-template-columns: repeat(7, 1fr);
			column-gap: 2px;
			row-gap: 3px;
		}
	}
</style>

<script lang="ts" setup>
	import { ref } from 'vue'
	import { CalInfo, DiasDelMes } from '../../../tools/calendar'
	import DiasCard from './dias-card.vue'

	const minfo = ref<CalInfo>(DiasDelMes(7, 2022))
</script>
