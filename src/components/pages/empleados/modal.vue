<template>
	<div
		class="modal fade"
		:id="`p${prop.dni}`"
		tabindex="-1"
		role="dialog"
		aria-hidden="true"
	>
		<div class="modal-dialog modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header" v-if="prop.papeleta == undefined">
					<div class="title">
						<h5 class="modal-title">
							{{ prop.nombre }}
						</h5>
						<h6>{{ prop.cargo }}</h6>
					</div>
					<button
						type="button"
						class="btn close"
						data-dismiss="modal"
						aria-label="Close"
					>
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body">
					<div class="input-group mb-3">
						<select
							class="custom-select"
							id="inputGroupSelect04"
							v-model="tipoper"
						>
							<option value="JUSTIFICADO">Justificado</option>
							<option value="DF">Descanso Fisico</option>
							<option value="AC">A cuenta</option>
							<option value="DFXHEL">Por horas Extras</option>
							<option value="OMISION">Omision</option>
							<option value="ONOMASTICO">Onomastico</option>
						</select>
					</div>
					<input
						class="input papeleta"
						type="number"
						min="4000"
						v-model="papeleta"
						placeholder="# PAPELETA"
					/>
					<v-date-picker mode="date" v-model="date" />
					<div class="field">
						<div class="control">
							<textarea
								spellcheck="false"
								class="textarea"
								placeholder="Descripcion"
								v-model="descrip"
							></textarea>
						</div>
						<div class="detalle">
							<input
								class="input papeleta"
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
					</div>

					<div class="botones">
						<button
							class="btn"
							@click="guardar"
							:class="isLoading ? 'is-loding' : ''"
							v-if="prop.papeleta == undefined"
						>
							Guardar
						</button>
						<button class="btn" :class="isLoading ? 'is-loding' : ''" v-else>
							Update
						</button>
						<div class="alert alert-warning" role="alert" v-if="isError">
							{{ message }}
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
|
<script lang="ts" setup>
	import { isNumber } from 'lodash'
	import 'v-calendar/dist/style.css'
	import { ref } from 'vue'
	import DocsImpl from '../../../../app/implement/docs'
	import { ConverDateToString, CheckIsEmpty } from '../../../../app/tools/doc'

	const doc = new DocsImpl()
	const prop = defineProps({
		nombre: { required: true, type: String },
		cargo: { type: String },
		dni: { required: true, type: String },
		papeleta: { required: false },
	})

	const isLoading = ref(false)
	const isError = ref(false)
	const message = ref<string>('')

	const tipoper = ref<string>('JUSTIFICADO')
	const date = ref<Date>(new Date())
	const papeleta = ref<number>(4000)
	const descrip = ref<string>('')
	const detalle = ref<string>('')
	const conretorno = ref(false)

	isUpdate()

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

	const clickRetorno = () => {
		conretorno.value = !conretorno.value
	}

	function isUpdate() {
		if (prop.papeleta !== undefined) {
			tipoper.value = prop.papeleta['tipoP']
			date.value = new Date(
				new Date(prop.papeleta['fecha']).getTime() + 86400000
			)
			descrip.value = prop.papeleta['descrip']
			detalle.value = prop.papeleta['detalle']
			papeleta.value = prop.papeleta['nombre']
		}
		// 86400000
	}
</script>
<style lang="scss" scoped>
	textarea,
	input {
		font-family: 'Ubuntu Mono', sans-serif;
	}
	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	h6 {
		font-weight: 500;
		font-size: 0.8rem !important;
		color: $alternative;
	}
	.modal-body {
		height: min-content;
		width: min-content;
		display: grid;
		grid-template-columns: auto 25vh;
		row-gap: 0.5vh;
		column-gap: 5vh;
		font-size: 0.85rem;

		label {
			align-self: center;
			justify-self: center;
			border: none;
			select,
			option {
				border: none;
				outline: 0;
			}
			:active,
			:focus,
			:before,
			:after,
			:target {
				border: none;
				outline: 0;
			}
		}

		.papeleta {
			height: min-content;
			outline: 0;
			border: 1px solid $alternative;
			border-radius: 25px;
			text-align: center;
			font-family: 'Roboto';
			font-weight: 400;
		}
		.field {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			height: 100%;
			gap: 3vh;
			.control {
				height: 80%;
				.textarea {
					width: 100%;
					height: 100%;
					border: 1px solid $alternative;
					outline: 0;
					font-weight: 500;
					text-align: center;
				}
			}
		}

		.detalle {
			display: flex;
			justify-content: center;
			align-items: flex-start;
			gap: 2vh;

			input {
				text-align: center;
				outline: 0;
			}
		}

		.botones {
			grid-column: 3 /1;
			align-self: center;
			justify-self: center;
			display: flex;
			justify-content: center;
			flex-direction: column;
			align-items: center;
			gap: 2vh;
			padding-top: 2vh;
			button {
				width: max-content;
			}
		}
	}
	.modal-content {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		width: max-content;
		height: max-content;
		border-radius: 25px;
		border: none;
		outline: none;

		// .form {
		// 	display: flex;
		// 	align-items: center;
		// 	padding-bottom: 2vh;
		// 	padding-top: 1vh;
		// 	padding-right: 1vh;
		// 	height: 100%;
		// 	.left {
		// 		display: flex;
		// 		flex-direction: column;
		// 		align-items: center;
		// 		gap: 3vh;
		// 		height: 100%;
		// 		width: 100%;
		// 	}
		// 	.other {
		// 		display: flex;
		// 		flex-direction: column;
		// 		align-items: center;
		// 		gap: 3vh;
		// 		height: 100%;
		// 		width: 100%;
		// 		.detalle {
		// 			display: flex;
		// 			justify-content: space-around;
		// 			gap: 2vh;
		// 			align-items: center;
		// 		}
		// 		.field {
		// 			width: 80%;
		// 		}
		// 		.details {
		// 			width: max-content;
		// 		}
		// 		.papeleta {
		// 			text-align: center;
		// 			width: 40%;
		// 		}
		// 	}
		// 	.select {
		// 		position: relative;
		// 		min-width: 200px;
		// 		svg {
		// 			position: absolute;
		// 			right: 12px;
		// 			top: calc(50% - 3px);
		// 			width: 10px;
		// 			height: 6px;
		// 			stroke-width: 2px;
		// 			stroke: #9098a9;
		// 			fill: none;
		// 			stroke-linecap: round;
		// 			stroke-linejoin: round;
		// 			pointer-events: none;
		// 		}
		// 		select {
		// 			-webkit-appearance: none;
		// 			padding: 7px 40px 7px 12px;
		// 			width: 100%;
		// 			border: 1px solid #e8eaed;
		// 			border-radius: 5px;
		// 			background: #fff;
		// 			box-shadow: 0 1px 3px -2px #9098a9;
		// 			cursor: pointer;
		// 			font-family: inherit;
		// 			font-size: 16px;
		// 			transition: all 150ms ease;
		// 			&:required {
		// 				&:invalid {
		// 					color: #5a667f;
		// 				}
		// 			}
		// 			option {
		// 				color: #223254;
		// 			}
		// 			option[value=''][disabled] {
		// 				display: none;
		// 			}
		// 			&:focus {
		// 				outline: none;
		// 				border-color: #07f;
		// 				box-shadow: 0 0 0 2px rgba(0, 119, 255, 0.2);
		// 			}
		// 			&:hover {
		// 				& + svg {
		// 					stroke: #07f;
		// 				}
		// 			}
		// 		}
		// 	}
		// 	.sprites {
		// 		position: absolute;
		// 		width: 0;
		// 		height: 0;
		// 		pointer-events: none;
		// 		user-select: none;
		// 	}
		// }
		// .empleado {
		// 	display: flex;
		// 	width: 100%;
		// 	padding: 1vh 2vh 0 2vh;
		// 	justify-content: space-between;
		// 	align-items: center;
		// 	.nombre {
		// 		display: flex;
		// 		flex-direction: column;
		// 		height: 100%;
		// 		justify-content: center;
		// 		gap: 1vh;
		// 		.name {
		// 			font-size: 1rem;
		// 			font-weight: 600;
		// 		}
		// 		h4 {
		// 			font-size: 0.7rem;
		// 			font-weight: 500;
		// 		}
		// 	}
		// }
	}
</style>
