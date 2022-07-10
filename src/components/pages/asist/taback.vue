<template>
	<div class="cale">
		<v-calendar
			locale="es"
			is-expanded
			:minDate="minDate()"
			:maxDate="maxDate()"
			:attributes="atributtes"
		>
			<!-- <template #day-popover="{ attributes }">
				<ul>
					<li v-for="{ key, customData } in attributes" :key="key">
						{{ customData.title }}
					</li>
				</ul>
			</template> -->
			<template #day-content="{ attributes, day }">
				<div class="day-c" @click="clickme(day)">
					<span class="dia-titulo">{{ day.day }}</span>
					<div class="flex-grow overflow-y-scroll overflow-x-auto vbody">
						<div v-for="attr in attributes" :key="attr.key">
							<p :class="attr.customData.class">
								{{ attr.customData.title }}
							</p>
						</div>
					</div>
				</div>
			</template>
		</v-calendar>
		<!-- <teleport to="body" v-if="openModal">
			<Modal dni="2" @change="changeModal"></Modal>
		</teleport> -->
	</div>
</template>

<script lang="ts" setup>
	import { AsistenciaDetalle } from '@/models/asistencia'
	import { Doc, Papeleta } from '@/models/documents'
	import 'v-calendar/dist/style.css'
	import { ref } from 'vue'
	import { addAtributtes } from '../../../tools/reloj'
	import Modal from './modal.vue'

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

	const changeModal = (e) => {
		openModal.value = e
	}

	const minDate = () => {
		var da = new Date().getFullYear()
		return `${da}-${props.mes}-01`
	}
	const maxDate = () => {
		var da = new Date().getFullYear()
		return `${da}-${props.mes}-30`
	}
	const clickme = (x) => {
		openModal.value = true
	}
</script>
<style lang="scss">
	.vc-weeks {
		display: grid;
		width: 100%;
		grid-template-columns: repeat(7, 0.5fr);
		min-width: none;
		gap: 1vh;
		.vc-day {
			width: 100%;
			.vbody {
				width: 100%;
				height: max-content;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				align-items: center;
				gap: 0.5vh;
				flex-wrap: wrap;
				.dia-titulo {
					font-size: 1.7rem;
					font-weight: 800;
				}
				p {
					padding-left: 1vh;
					padding-right: 1vh;
					width: max-content;
					height: max-content;
					border-radius: 10px;
					word-break: break-all;
					white-space: normal;
				}
				.marca,
				.papeleta,
				.memorando {
					font-size: 0.8rem;
					color: white;
					font-weight: 400;
					@media (max-width: 1024px) {
						font-size: 0.4rem;
					}
				}
				.marca {
					font-weight: 500;
					background-color: $primary;
				}
				.papeleta {
					background-color: $secundary;
				}
				.memorando {
					background-color: #2b88d9;
				}
			}
		}
	}
</style>
