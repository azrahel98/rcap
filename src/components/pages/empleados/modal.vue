<template>
	<div class="modal is-active">
		<div class="modal-background"></div>
		<div class="modal-content" v-click-outside="out">
			<div class="empleado">
				<div class="nombre">
					<h4 class="name">{{ prop.nombre }}</h4>
					<h4>{{ prop.cargo }}</h4>
				</div>
				<p class="subtitle is-6">PAPELETA</p>
				<button class="delete" aria-label="close" @click="close"></button>
			</div>
			<div class="form">
				<div class="left">
					<div class="permisos">
						<label class="select" for="slct"
							><select id="slct" v-model="tipoper">
								<option value="JUSTIFICADO">Justificado</option>
								<option value="DF">Descanso Fisico</option>
								<option value="AC">A cuenta</option>
								<option value="DFXHEL">Por horas Extras</option>
								<option value="OMISION">Omision</option>
								<option value="ONOMASTICO">Onomastico</option>
							</select></label
						><svg class="sprites"></svg>
					</div>
					<v-date-picker mode="date" v-model="date" class="calendario-picker">
					</v-date-picker>
				</div>
				<div class="other">
					<input
						class="input is-small is-rounded papeleta"
						type="number"
						min="4000"
						v-model="papeleta"
						placeholder="# PAPELETA"
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
							v-model="detalle"
							placeholder="Detalle"
						/>
						<label class="checkbox">
							<input
								type="checkbox"
								v-model="conretorno"
								@keyup.enter="clickRetorno"
							/>
							Regreso?
						</label>
					</div>
					<div class="botones">
						<button
							class="button"
							@click="guardar"
							:class="isLoading ? 'is-loding' : ''"
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

	const tipoper = ref<string>('JUSTIFICADO')
	const date = ref<Date>(new Date())
	const papeleta = ref<number>(4000)
	const descrip = ref<string>('')
	const detalle = ref<string>('')
	const conretorno = ref(false)

	const guardar = async () => {
		if (CheckIsEmpty(descrip.value, detalle.value)) {
			isLoading.value = true
			var id = await doc.creaer_papeleta({
				nombre: papeleta.value.toString(),
				descrip: descrip.value,
				dni: prop.dni,
				fecha: ConverDateToString(date.value),
				retorno: conretorno.value ? 'Y' : 'N',
				tipoP: tipoper.value,
				detalle: detalle.value,
			})
			isLoading.value = false
			isError.value = false
			if (isNumber(id)) {
				message.value = `El ultimo registro Guardado fue ${id}`
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

	const clickRetorno = () => {
		conretorno.value = !conretorno.value
	}

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
		background-color: white;
		border-radius: 15px;

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
			}
			.other {
				display: flex;
				flex-direction: column;
				align-items: center;
				gap: 3vh;
				height: 100%;
				width: 100%;
				.detalle {
					display: flex;
					justify-content: space-around;
					gap: 2vh;
					align-items: center;
				}
				.field {
					width: 80%;
				}
				.details {
					width: max-content;
				}
				.papeleta {
					text-align: center;
					width: 40%;
				}
			}
			.select {
				position: relative;
				min-width: 200px;
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

<style>
	.vc-weeks {
		row-gap: 0;
	}
</style>
