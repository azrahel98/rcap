<template>
	<div
		class="modal fade"
		tabindex="-1"
		role="dialog"
		:id="`p${prop.dni}`"
		aria-hidden="true"
	>
		<div class="modal-dialog modal-dialog-centered" role="document">
			<div class="modal-content">
				<form
					class="row g-3 needs-validation"
					@submit.prevent="save()"
					autocomplete="off"
				>
					<div class="col-md-6">
						<label for="validationCustom01" class="form-label">Papeleta</label>
						<input
							type="text"
							class="form-control"
							id="validationCustom01"
							v-model="papp"
							required
						/>
					</div>

					<div class="col-md-6">
						<label for="validationCustom04" class="form-label">Permiso</label>
						<select
							class="form-select"
							id="validationCustom04"
							v-model="tipop"
							required
						>
							<option selected value="JUSTIFICADO">JUST</option>
							<option value="DF">DF</option>
							<option value="AC">AC</option>
							<option value="DFXHEL">DFXHEL</option>
							<option value="OMISION">OMISION</option>
							<option value="ONOMASTICO">ONOMASTICO</option>
						</select>
					</div>
					<div class="col-md-auto">
						<v-date-picker mode="date" v-model="date" />
					</div>
					<div class="col-md-5 detalle">
						<textarea
							class="form-control"
							placeholder="####"
							id="floatingTextarea2"
							style="height: 70%"
							v-model="descr"
							required
						/>
						<input
							type="text"
							class="form-control"
							id="validationCustom01"
							required
							v-model="deta"
						/>
					</div>

					<div class="col-12 text-center">
						<button class="btn btn-primary" type="submit">Guardar</button>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
	import { ref } from 'vue'
	import 'v-calendar/dist/style.css'
	import { DocImpl } from '@/implement/docImpl'
	import { useToast } from 'vue-toastification'

	const docim = new DocImpl()
	const toast = useToast()

	const prop = defineProps({
		dni: { required: true, type: String },
	})

	const date = ref<Date>(new Date())
	const papp = ref<string>()
	const tipop = ref<string>('JUSTIFICADO')
	const descr = ref<string>()
	const deta = ref<string>()

	const save = async () => {
		try {
			const result = await docim.create_pp({
				descrip: descr.value,
				detalle: deta.value,
				dni: prop.dni,
				fecha: date.value,
				permiso: tipop.value,
				pp: papp.value,
			})
			toast.success(`Ultimo id guardado: ${result.pid}`, {
				icon: {
					iconClass: 'material-icons',
					iconChildren: 'person_search',
					iconTag: 'span',
				},
			})
		} catch (error) {
			toast.error((error as Error).message, {
				icon: {
					iconClass: 'material-icons',
					iconChildren: 'person_search',
					iconTag: 'span',
				},
			})
		}
	}
</script>

<style lang="scss" scoped>
	.modal-dialog {
		max-width: auto;
		margin-left: auto;
		margin-right: auto;
		.modal-content {
			display: grid;
			grid-template-rows: auto auto auto;
			grid-template-columns: 1fr;
			background-color: white;
			border-radius: 15px;
			padding: 1vh;
			.detalle {
				display: flex;
				flex-direction: column;
				gap: 2vh;
			}
		}
	}
</style>
