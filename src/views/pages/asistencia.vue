<template>
	<div class="appi">
		<div class="detalle">
			<div class="name">
				<h3 class="title is-5">{{ employ.nombre }}</h3>
				<h5 class="subtitle is-5">
					{{ router.currentRoute.value.params.dni.toString() }}
				</h5>
			</div>
			<div class="informacion">
				<p>{{ employ.area }}</p>
				<p>{{ employ.cargo }}</p>
				<p>{{ employ.ingreso }}</p>
			</div>
		</div>
		<div class="asistencias">
			<Calasiste
				class="calendar"
				:dni="router.currentRoute.value.params.dni.toString()"
				:mes="6"
			></Calasiste>
			<Calendar></Calendar>
		</div>
	</div>
</template>

<script lang="ts" setup>
	import { onMounted, ref } from 'vue'
	import EmployImpl from '../../../app/implement/employ'
	import router from '../../router/router'
	import { Employ } from './../../../app/models/employ'
	import Calendar from '../../components/pages/asist/calendar.vue'
	import Calasiste from '../../components/pages/asist/calasiste.vue'

	const employ = ref<Employ>({})
	const impl = new EmployImpl()

	onMounted(async () => {
		employ.value = await impl.buscar_pordni(
			router.currentRoute.value.params.dni.toString()
		)
	})
</script>

<style lang="scss" scoped>
	.appi {
		height: 100vh;
		margin: 0 !important;
		padding-bottom: 10%;
		display: grid !important;
		padding: 0 !important;
		grid-template-rows: 0.5fr 4fr;
		align-items: flex-start;
		gap: 2vh;
		.detalle {
			height: 100%;
			display: flex;
			justify-content: space-between;
			align-items: flex-start;
			.name {
				display: flex;
				flex-direction: column;
				justify-content: flex-start;
			}
			.informacion {
				display: flex;
				height: max-content;
				flex-direction: column;
				align-items: flex-end;
				p {
					font-weight: 500;
				}
			}
		}
		.asistencias {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			gap: 2vh;
			.calendar {
				width: 12vh !important;
			}
			// .calendarios {
			// 	gap: 2vh;
			// 	display: flex;
			// 	flex-direction: column;
			// 	justify-content: space-around;
			// }
			// .tabla {
			// 	width: 20vh;
			// 	height: 50vh;
			// }
		}
	}
</style>
