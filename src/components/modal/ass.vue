<template>
	<div class="dia-button">
		<button
			class="btn-c"
			data-bs-toggle="modal"
			:data-bs-target="`#modal-${prop.mes}-${i}`"
		>
			{{ prop.i }}
		</button>
		<div
			class="modal fade"
			role="dialog"
			:id="`modal-${prop.mes}-${i}`"
			aria-hidden="true"
		>
			<div class="modal-dialog modal-dialog-centered">
				<div class="modal-content">
					<form
						class="row g-3 needs-validation"
						autocomplete="off"
						@submit.prevent="save()"
					>
						<div class="col-md-6">
							<label for="validationCustom01" class="form-label"
								>Tardanza</label
							>
							<input
								type="number"
								class="form-control"
								min="0"
								id="validationCustom01"
								v-model="tardanza"
							/>
						</div>
						<div class="col-md-6">
							<label for="validationCustom01" class="form-label"
								>A cuenta</label
							>
							<input
								type="number"
								class="form-control"
								id="validationCustom01"
								min="0"
								v-model="ac"
							/>
						</div>

						<div class="col-md-2">
							<label for="validationCustom04" class="form-label">Falta</label>
							<input
								class="form-check-input"
								type="checkbox"
								value=""
								id="flexCheckIndeterminate"
								v-model="falta"
							/>
						</div>

						<div class="col-md-auto detalle">
							<textarea
								class="form-control text-area-c"
								placeholder="##########"
								id="validationCustom01"
								style="height: 18vh"
								v-model="detalle"
							/>
						</div>

						<div class="col-12 text-center">
							<button class="btn btn-primary" type="submit">Guardar</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
	import { AsistEstore } from '@store/asistencia'
	import moment from 'moment'
	import { ref } from 'vue'
	import { AsistenciaImp } from '../../../app/implement/asistencia'

	const asimp = new AsistenciaImp()
	const Asistore = AsistEstore()

	const prop = defineProps({
		i: { required: true, type: Number },
		mes: { required: true, type: Number },
		dni: { required: true, type: String },
	})

	const tardanza = ref<number>()
	const ac = ref<number>()
	const detalle = ref<string>()
	const falta = ref<boolean>()
	const fecha = moment(`2022-${prop.mes - 1}-${prop.i}`)

	const save = async () => {
		try {
			const result = await asimp.add({
				dni: prop.dni,
				fecha: fecha.toDate(),
				tardanza: tardanza.value == 0 ? null : tardanza.value,
				acuenta: ac.value == 0 ? null : ac.value,
				falta: falta.value,
			})
			console.log(result)
			Asistore.addDay(result)
		} catch (error) {
			console.log('error')
			console.log(error)
		}
	}
</script>

<style lang="scss" scoped>
	.modal-content {
		padding: 1vh;
	}
	.dia-button {
		.btn-c {
			background-color: transparent;
			outline: none;
			border: none;
			color: black;
			width: min-content;
			height: min-content;
			padding: 0;
			margin: 0;
		}
	}
</style>
