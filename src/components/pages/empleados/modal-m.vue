<template>
	<div class="modal is-active">
		<div class="modal-background"></div>
		<div class="modal-content" v-click-outside="out">
			<div class="empleado">
				<div class="nombre">
					<h4 class="name">{{ prop.nombre }}</h4>
					<h4>{{ prop.cargo }}</h4>
				</div>
				<p class="subtitle is-6">MEMORANDOOO</p>
				<button class="delete" aria-label="close" @click="close"></button>
			</div>
			<div class="form">
				<div class="left">
					<div class="permisos">
						<label class="select" for="slct"
							><select id="slct" v-model="tipodoc">
								<option value="RESOLUCION">Resolucion</option>
								<option value="CARTA">Carta</option>
								<option value="INFORME">Informe</option>
								<option value="RENUNCIA">Renuncia</option>
								<option value="SOLICITUD">Solicitud</option>
								<option value="MEMORANDO">Memorando</option>
							</select></label
						><svg class="sprites"></svg>
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
						><svg class="sprites"></svg>
					</div>
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
						<v-date-picker is-range v-if="docwithrange" v-model="rangedates" />
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

	var clickz: number = 0
	const e = defineEmits(['change'])
	const close = () => {
		e('change', false)
	}

	const out = () => {
		clickz++

		if (clickz > 1 && outclick.value) {
			close()
		}
	}
</script>
<style lang="scss" scoped>
	textarea,
	input {
		font-family: 'Ubuntu Mono', sans-serif;
		font-weight: 600;
	}
	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
	.modal-content {
		// min-height: 60vh;
		min-width: 70vh;
		background-color: white;
		border-radius: 15px;
		padding-bottom: 6vh;
		.form {
			display: flex;
			align-items: center;
			padding-bottom: 2vh;
			padding-top: 1vh;
			padding-right: 1vh;
			height: 100%;
			.left {
				display: flex;
				flex-direction: column;
				align-items: center;
				gap: 3vh;
				height: 100%;
				width: 100%;
				.permisos {
					padding-left: 1vh;
					padding-right: 1vh;
					gap: 1vh;
					display: flex;
					padding-bottom: 2vh;
					height: max-content;
				}
				.times {
					width: 100%;
					height: max-content;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					gap: 25px;
					.fecha-doc {
						display: flex;
						justify-content: center;
						gap: 2vh;
					}
				}
			}
			.other {
				display: flex;
				flex-direction: column;
				align-items: center;
				gap: 3vh;
				height: 100%;
				min-width: 45%;
				.detalle {
					width: 80%;
					display: flex;
					justify-content: space-around;
					align-items: center;
				}
				.field {
					width: 80%;
				}

				.memorando {
					text-align: center;
					width: 70%;
				}
			}
			.select {
				position: relative;
				min-width: min-content;
				svg {
					position: absolute;
					right: 12px;
					top: calc(50% - 3px);
					width: 10px;
					height: 6px;
					stroke-width: 2px;
					stroke: #9098a9;
					fill: none;
					stroke-linecap: round;
					stroke-linejoin: round;
					pointer-events: none;
				}
				select {
					-webkit-appearance: none;
					padding: 7px 40px 7px 12px;
					width: 100%;
					border: 1px solid #e8eaed;
					border-radius: 5px;
					background: #fff;
					box-shadow: 0 1px 3px -2px #9098a9;
					cursor: pointer;
					font-family: inherit;
					font-size: 16px;
					transition: all 150ms ease;
					&:required {
						&:invalid {
							color: #5a667f;
						}
					}
					option {
						color: #223254;
					}
					option[value=''][disabled] {
						display: none;
					}
					&:focus {
						outline: none;
						border-color: #07f;
						box-shadow: 0 0 0 2px rgba(0, 119, 255, 0.2);
					}
					&:hover {
						& + svg {
							stroke: #07f;
						}
					}
				}
			}
			.sprites {
				position: absolute;
				width: 0;
				height: 0;
				pointer-events: none;
				user-select: none;
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
	}
</style>
