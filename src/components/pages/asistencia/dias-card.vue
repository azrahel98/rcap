<template>
	<div class="d-card">
		<div class="day-info">
			<h1>{{ prop.day }}</h1>
			<div class="d-marca">
				<h6 v-for="x in prop.list">
					{{ x['marca'] }}
				</h6>
			</div>
		</div>

		<div class="d-docs">
			<div class="d-p">
				<div v-for="x in papeletas">
					<span
						class="badge badge-primary"
						data-toggle="modal"
						:data-target="`#p${x['nombre']}`"
						@click="() => (showModal = true)"
					>
						{{ x['nombre'] }}
					</span>
					<ModalP
						:dni="`${x['nombre']}`"
						:nombre="x['nombre']"
						:papeleta="x"
						v-if="showModal"
					/>
				</div>
			</div>
			<div class="d-doc">
				<div v-for="x in docs">
					<span
						class="badge badge-info"
						data-toggle="modal"
						:data-target="`#m${x['nombre']}`"
						>{{ x['doc'] }}</span
					>
					<Modal :id="`m${x['nombre']}`">
						<div class="m-cont">
							<div class="m-top">
								<p>{{ x['tipo'] }}</p>
								<h6>{{ x['doc'] }}</h6>
							</div>
							<div class="m-descr">
								<p>{{ x['descrip'] }}</p>
								<div>
									<span>{{ x['fecha'] }}</span>
									<h5>{{ x['permiso'] }}</h5>
								</div>
							</div>
							<div class="rango">
								<span>{{ x['Inicio'] }}</span>
								<span>{{ x['Fin'] }}</span>
							</div>
						</div>
					</Modal>
				</div>
			</div>
		</div>
	</div>
</template>
<script lang="ts" setup>
	import { onMounted, ref } from 'vue'
	import Modal from './modal/modal.vue'
	import ModalP from '../empleados/modal.vue'

	const prop = defineProps({
		day: { type: Number, required: true },
		list: { required: false },
		papeletas: { required: false },
		docs: { required: false },
	})

	const showModal = ref<any>(false)
</script>
<style lang="scss" scoped>
	.d-card {
		border: 0.01rem solid #cbcee1;
		display: grid;
		width: 100%;
		border-radius: 20px;
		grid-template-rows: min-content 1fr;
		grid-template-columns: auto;
		row-gap: 2px;
		.day-info {
			display: flex;
			width: 100%;
			height: 100%;
			flex-wrap: wrap;
			align-items: center;
			justify-content: center;
			gap: 2px;
			h1 {
				font-size: 1.2rem;
				text-align: center;
			}
			.d-marca {
				display: flex;
				flex-wrap: wrap;
				flex-direction: column;
				align-items: center;
				padding-top: 4px;
				h6 {
					font-size: calc(5px + 0.390625vw);
				}
			}
		}
		.d-docs {
			justify-self: center;
			align-self: center;
			display: flex;
			gap: 1vh;
			flex-wrap: wrap;
			align-items: center;
			justify-content: center;
			padding: 0 0.5vh 0.8vh 0.5vh;
			.d-p {
				display: flex;
				gap: 1vh;
				align-items: center;
				justify-content: center;
				flex-wrap: wrap;
			}
			.d-doc {
				span {
					display: flex;
					flex-wrap: wrap;
					gap: 1vh;
					inline-size: 50px;
				}
				.m-cont {
					padding: 2vh 2vh 0 2vh;
					.m-top {
						display: flex;
						justify-content: center;
						align-items: center;
						gap: 1vh;
					}
					.m-descr {
						display: flex;
					}
					.rango {
						display: flex;
						width: 100%;
						justify-content: center;
						gap: 2vh;
					}
				}
			}
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 0.7rem;
		}
	}
</style>
