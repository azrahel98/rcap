<template>
	<div class="cale">
		<v-calendar
			locale="es"
			is-expanded
			:minDate="minDate()"
			:maxDate="maxDate()"
			:attributes="atributtes"
			popover-direction="left"
		>
			<template #day-popover="{ attributes }">
				<ul class="all test">
					<li v-for="{ key, customData } in attributes" :key="key">
						<h1 v-if="customData.marca !== undefined">
							<div
								v-if="parseInt(customData.marca.split('-')[0]) < 12"
								class="hour"
							>
								<i class="fa-solid fa-user-clock"></i>
								<p>{{ customData.marca }}</p>
							</div>

							<div v-else class="hour">
								<i class="fa-solid fa-user-lock"></i>
								<p>{{ customData.marca }}</p>
							</div>
						</h1>
						<div v-if="customData.papeleta !== undefined" class="pape">
							<h1>PAPELETA {{ customData.nombre }}</h1>
							<h2>{{ customData.tipo }}</h2>
							<p>{{ customData.descrip }}</p>
							<p>{{ customData.detalle }}</p>
						</div>
						<div v-if="customData.memo !== undefined" class="memo">
							<h1># {{ customData.nombre }}</h1>
							<h2>{{ customData.tipo }}</h2>
							<p>{{ customData.descrip }}</p>
							<p>{{ customData.detalle }}</p>
						</div>
					</li>
				</ul>
			</template>
		</v-calendar>
	</div>
</template>

<script lang="ts" setup>
	import { AsistenciaDetalle } from '@/models/asistencia'
	import { Doc, Papeleta } from '@/models/documents'
	import 'v-calendar/dist/style.css'
	import { ref } from 'vue'
	import { addAtributtes } from '../../../tools/reloj'

	const props = defineProps({
		mes: { type: Number, required: true },
		marcaciones: { type: Array, required: true },
		papeletas: { type: Array, required: true },
		docs: { type: Array, required: true },
	})
	const atributtes = ref<any>(
		addAtributtes(
			props.marcaciones as AsistenciaDetalle[],
			props.papeletas as Papeleta[],
			props.docs as Doc[]
		)
	)

	const openModal = ref<any>(false)

	const minDate = () => {
		var da = new Date().getFullYear()
		return `${da}-${props.mes}-01`
	}
	const maxDate = () => {
		var da = new Date().getFullYear()
		return `${da}-${props.mes}-30`
	}
</script>
<style lang="scss" scoped>
	.cale {
		height: 100%;
		.all {
			display: flex;
			flex-direction: column;
			align-items: center;
			gap: 1vh;
			.hour {
				display: flex;
				gap: 1vh;
				align-items: center;
			}
			.pape,
			.memo {
				display: flex;
				flex-direction: column;
				align-items: center;

				h1 {
					font-weight: 600;
					font-size: 0.8rem;
				}
				h2 {
					font-size: 0.75rem;
					font-weight: 500;
				}
				p {
					display: flex;
					justify-content: space-center;
					gap: 1vh;
				}
			}
			.memo {
				border: 1px white dotted;
				margin: 3px;
			}
		}
	}
</style>
<style lang="scss">
	.vc-weeks {
		display: grid;
		grid-template-columns: repeat(7, 0.5fr);
		row-gap: 5vh;
		min-width: none;
		.vc-weekday {
			padding-bottom: 3vh;
		}
		.vc-day {
			width: 100%;
			height: 100%;
			color: black;
			.vc-day-layer {
				.vc-dots {
					display: flex;
					justify-content: end;
					align-items: flex-end;
				}
			}
			.vc-day-content {
				color: black;
			}
			.vbody {
				width: 100%;
				height: max-content;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				align-items: center;
				gap: 0.5vh;
				flex-wrap: wrap;
			}
		}
	}
	.vc-popover-content-wrapper {
		background-color: transparent !important;
		border: none !important;
	}
	.vc-day-popover-container {
		background: rgba(48, 48, 48, 0.98);
		border-radius: 16px;
		box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
		backdrop-filter: blur(6.8px);
		-webkit-backdrop-filter: blur(6.8px);
		border: 1px solid rgba(48, 48, 48, 0.3);
		border: none !important;
	}
</style>
