<template>
	<div
		class="modal fade"
		tabindex="-1"
		role="dialog"
		:id="`m${prop.dni}`"
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
						<label for="validationCustom01" class="form-label">##</label>
						<input
							type="text"
							class="form-control"
							id="validationCustom01"
							v-model="docname"
							required
						/>
					</div>

					<div class="col-md-6">
						<label for="validationCustom04" class="form-label">TipoDoc</label>
						<select
							class="form-select"
							id="validationCustom04"
							v-model="tipoDoc"
							required
						>
							<option value="RESOLUCION">Resolucion</option>
							<option value="CARTA">Carta</option>
							<option value="INFORME">Informe</option>
							<option value="RENUNCIA">Renuncia</option>
							<option value="SOLICITUD">Solicitud</option>
							<option value="MEMORANDO">Memorando</option>
						</select>
					</div>
					<div class="col-md-6">
						<label for="validationCustom04" class="form-label">Permiso</label>
						<select
							class="form-select"
							id="validationCustom05"
							v-model="tipop"
							required
						>
							<option value="DF">Descanso Fisico</option>
							<option value="AC">A cuenta</option>
							<option value="JUSTIFICADO">Justificado</option>
							<option value="XHEL">Por horas Extras</option>
							<option value="ONOMASTICO">Onomastico</option>
							<option value="ADELANTO">Adelanto</option>
							<option value="SANSION">Sansion</option>
							<option value="LICENCIA">Licencia</option>
							<option value="HORASEXTRAS">Horas Extras</option>
							<option value="OMISION">Omision</option>
							<option value="OTROS">Otros</option>
						</select>
					</div>
					<div class="col-md-6">
						<label for="validationCustom01" class="form-label">Ref</label>
						<input
							type="text"
							class="form-control"
							id="validationCustom01"
							v-model="refe"
							required
						/>
					</div>
					<div class="col-md-auto">
						<v-date-picker v-model="date" mode="date" id="validationCustom01">
							<template v-slot="{ inputValue, inputEvents }">
								<input
									class="px-2 py-1 border rounded focus:outline-none focus:border-blue-300 d-pick"
									:value="inputValue"
									v-on="inputEvents"
								/>
							</template>
						</v-date-picker>
						<v-date-picker
							is-range
							v-if="docwithrange"
							v-model="docrange"
							id="validationCustom01"
							class="fechas"
						/>
					</div>
					<div class="col-md-5 detalle">
						<div class="form-check">
							<input
								class="form-check-input"
								type="checkbox"
								value=""
								id="flexCheckIndeterminate"
								v-model="docwithrange"
							/>
							<label class="form-check-label" for="flexCheckIndeterminate">
								El doc tiene rangos?
							</label>
						</div>
						<textarea
							class="form-control text-area-c"
							placeholder="##########"
							id="validationCustom01"
							style="height: 28vh"
							v-model="descr"
							required
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

	const docwithrange = ref(false)

	const date = ref<Date>(new Date()) //fecha
	const docname = ref<string>() // nombre
	const tipop = ref<string>('JUSTIFICADO') //permiso
	const tipoDoc = ref<string>('MEMORANDO') //tipodoc
	const descr = ref<string>() // descrip
	const refe = ref<string>() // referencia
	const docrange = ref(false)

	const save = async () => {
		try {
			const result = await docim.create_doc(
				{
					activo: true,
					descr: descr.value,
					dni: prop.dni,
					docpe: tipop.value,
					doct: tipoDoc.value,
					ref: refe.value,
					fecha: date.value,
					nombre: docname.value,
					fin: docwithrange.value
						? docrange.value
							? ConverDateToString(docrange.value['end'] as Date)
							: ''
						: '',
					inicio: docwithrange.value
						? docrange.value
							? ConverDateToString(docrange.value['start'] as Date)
							: ''
						: '',
				},
				true
			)
			toast.success(`Ultimo id guardado: ${result.docId}`, {
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
	function ConverDateToString(fecha: Date): string {
		var month = fecha.getUTCMonth() + 1
		var day = fecha.getDate()
		var year = fecha.getFullYear()
		return `${year}-${month}-${day}`
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
			.fechas {
				margin-top: 2vh;
			}
		}
	}
</style>
