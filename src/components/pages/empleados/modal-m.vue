<template>
	<div
		class="modal fade"
		:id="`m${prop.dni}`"
		tabindex="-1"
		role="dialog"
		aria-hidden="true"
	>
		<div
			class="modal-dialog modal-dialog-centered modal-dialog-scrollable"
			role="document"
		>
			<div class="modal-content">
				<div class="empleado">
					<div class="nombre">
						<h4 class="name">{{ prop.nombre }}</h4>
						<h4>{{ prop.cargo }}</h4>
					</div>
				</div>
				<div class="d-tp">
					<div class="lb-t">
						<label class="select" for="slct"
							><select id="slct" v-model="tipodoc">
								<option value="RESOLUCION">Resolucion</option>
								<option value="CARTA">Carta</option>
								<option value="INFORME">Informe</option>
								<option value="RENUNCIA">Renuncia</option>
								<option value="SOLICITUD">Solicitud</option>
								<option value="MEMORANDO">Memorando</option>
							</select></label
						>
					</div>
					<div class="lb-t">
						<label class="select" for="slct"
							><select id="slct" v-model="tipoper">
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
							</select></label
						>
					</div>
				</div>
				<div class="form">
					<div class="f-left">
						<div class="form-floating">
							<input type="email" class="form-control" v-model="memorando" />
							<label># Doc</label>
						</div>
						<div class="d-fecha">
							<div class="f-info">
								<div>
									<v-date-picker v-model="date" mode="date">
										<template v-slot="{ inputValue, inputEvents }">
											<input
												class="px-2 py-1 border rounded focus:outline-none focus:border-blue-300 d-pick"
												:value="inputValue"
												v-on="inputEvents"
											/>
										</template>
									</v-date-picker>
								</div>
								<label class="checkbox">
									<input type="checkbox" v-model="docwithrange" />
									Rango
								</label>
							</div>
							<v-date-picker
								is-range
								v-if="docwithrange"
								v-model="rangedates"
							/>
						</div>
					</div>
					<div class="f-r">
						<div class="form-floating">
							<input type="email" class="form-control" v-model="referencia" />
							<label>Ref</label>
						</div>
						<div class="form-floating area">
							<textarea v-model="descrip" class="form-control"></textarea>
							<label>Descripcion</label>
						</div>
					</div>
					<!-- <div class="left">
						
						<div class="times">
							<div class="fecha-doc">
								<label class="checkbox">
									<input type="checkbox" v-model="docwithrange" />
									Rango
								</label>
								<v-date-picker v-model="date" mode="date">
									<template v-slot="{ inputValue, inputEvents }">
										<input
											class="px-2 py-1 border rounded focus:outline-none focus:border-blue-300"
											:value="inputValue"
											v-on="inputEvents"
										/>
									</template>
								</v-date-picker>
							</div>
							<v-date-picker
								is-range
								v-if="docwithrange"
								v-model="rangedates"
							/>
						</div>
					</div>
					<div class="other">
						<input
							class="input is-small is-rounded memorando"
							type="text"
							v-model="memorando"
							placeholder="###"
						/>
						<div class="field">
							<div class="control">
								<textarea
									class="textarea"
									placeholder="Descripcion"
									v-model="descrip"
								></textarea>
							</div>
						</div>
						<div class="detalle">
							<input
								class="input is-small details"
								type="text"
								v-model="referencia"
								placeholder="Ref"
							/>
						</div>
						<div class="botones">
							<button
								class="button"
								@click="guardar"
								:class="isLoading ? 'is-loding' : ''"
								:disabled="isLoading"
							>
								Guardar
							</button>
							<p class="help" :class="isError ? 'is-danger' : 'is-success'">
								{{ message }}
							</p>
						</div>
					</div> -->
				</div>
				<div class="btn-send">
					<button
						class="btn btn-info"
						@click="guardar"
						:class="isLoading ? 'is-loding' : ''"
						:disabled="isLoading"
					>
						Guardar
					</button>
					<div
						class="alert"
						role="alert"
						:class="isError ? 'alert-warning' : 'alert-success'"
					>
						{{ message }}
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
	import { isNumber } from 'lodash'
	import 'v-calendar/dist/style.css'
	import { ref, watchEffect } from 'vue'
	import DocsImpl from '../../../../app/implement/docs'
	import { ConverDateToString, CheckIsEmpty } from '../../../../app/tools/doc'

	const doc = new DocsImpl()
	const prop = defineProps({
		nombre: { required: true, type: String },
		cargo: { required: true, type: String },
		dni: { required: true, type: String },
	})
	const outclick = ref(true)
	const isLoading = ref(false)
	const isError = ref(false)
	const message = ref<string>('')
	const docwithrange = ref(false)

	const tipoper = ref<string>('JUSTIFICADO')
	const tipodoc = ref<string>('MEMORANDO')
	const date = ref<Date>(new Date())
	const memorando = ref<string>()
	const descrip = ref<string>('')
	const referencia = ref<string>('')
	const rangedates = ref(false)

	const guardar = async () => {
		if (CheckIsEmpty(descrip.value, referencia.value)) {
			isLoading.value = true
			try {
				var id = await doc.crear_docs(
					{
						tipo: tipodoc.value,
						Ref: referencia.value,
						descrip: descrip.value,
						dni: prop.dni,
						doc: memorando.value,
						fecha: ConverDateToString(date.value),
						permiso: tipoper.value,
						Fin: docwithrange.value
							? ConverDateToString(rangedates.value['end'] as Date)
							: '',
						Inicio: docwithrange.value
							? ConverDateToString(rangedates.value['start'] as Date)
							: '',
					},
					docwithrange.value
				)
				isLoading.value = false
				console.log(rangedates.value)
				isError.value = false
				if (isNumber(id)) {
					message.value = `El ultimo registro Guardado fue ${id}`
				}
			} catch (error) {
				isError.value = true
				message.value = error
			}
		} else {
			isError.value = true
			message.value = 'Campos vacios'
		}
	}

	watchEffect(() => {
		if (descrip.value.length > 2) {
			outclick.value = false
		}
	})

	const e = defineEmits(['change'])
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
			padding: 6px;
			.d-tp {
				height: min-content;
				display: flex;
				justify-content: space-around;
				flex-wrap: wrap;
				align-items: center;
				height: 50px;
				width: 100%;
				.lb-t {
					width: min-content;
				}
			}
			.form {
				display: flex;
				gap: 2vh;
				.f-left {
					display: flex;
					flex-direction: column;
					gap: 2vh;
					flex-wrap: wrap;
					align-items: center;
					.d-fecha {
						display: flex;
						flex-direction: column;
						gap: 2vh;
						align-items: center;
						.f-info {
							display: flex;
							justify-content: center;
							gap: 2vh;
							justify-content: space-around;
							align-items: center;
							.d-pick {
								max-width: 12vh;
							}
						}
					}
				}
				.f-r {
					display: flex;
					flex-direction: column;
					height: 100%;
					justify-content: flex-start;
					gap: 4vh;
					.area {
						height: 50%;
						textarea {
							min-height: 150px;
						}
					}
				}
				.form-floating {
					width: 100%;
					input {
						height: 4vh;
					}
					label {
						height: 4px;

						padding-top: 1px;
						font-size: 0.8rem;
						background-color: white;
					}
				}
			}
			.empleado {
				display: flex;
				width: 100%;
				padding: 1vh 2vh 0 2vh;

				justify-content: space-between;
				align-items: center;
				.nombre {
					display: flex;
					flex-direction: column;
					height: 100%;
					justify-content: center;
					gap: 1vh;
					.name {
						font-size: 1rem;
						font-weight: 600;
					}
					h4 {
						font-size: 0.7rem;
						font-weight: 500;
					}
				}
			}
			.btn-send {
				justify-self: center;
				padding-top: 4vh;
				display: flex;
				gap: 2vh;
				flex-direction: column;
			}
		}
	}
</style>
