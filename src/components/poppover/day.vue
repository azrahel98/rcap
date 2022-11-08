<template>
	<div class="content">
		<div class="button">
			<button class="btn" :id="`popover-dreact-${prop.dia}`" type="button">
				{{ prop.dia }}
			</button>
		</div>
		<b-popover
			:target="`popover-dreact-${prop.dia}`"
			triggers="click"
			placement="auto"
			ref="popover"
			:show.sync="onShow"
		>
			<div class="contenedor" v-on:keydown="escxpres">
				<div class="tardanza">
					<label for="tardanza">Tardanza </label>
					<input
						type="number"
						name="tardanza"
						id="tardanza"
						min="1"
						placeholder="Tardanzas"
						v-model="tardanza"
					/>
				</div>
				<div class="acuenta">
					<label for="acuenta">A cuenta</label>
					<input
						type="number"
						name="acuenta"
						id="acuenta"
						min="1"
						placeholder="Acuenta"
						v-model="ac"
					/>
				</div>
				<div class="falta">
					<button
						:class="[falta ? 'falto' : 'no-falto']"
						v-on:click="() => (falta = !falta)"
					>
						Falta
					</button>
				</div>
				<div class="guardar">
					<button class="btn btn-info" v-on:click="save">Save</button>
				</div>
			</div>
		</b-popover>
	</div>
</template>

<script lang="ts" setup>
	import { AsistenciaImp } from '@/implement/asistencia'
	import { AsistEstore } from '@store/asistencia'
	import { ref } from 'vue'

	const prop = defineProps({
		dia: { type: Number, required: true },
		mes: { required: true, type: Number },
		dni: { required: true, type: String },
	})

	const asisStore = AsistEstore()
	const onShow = ref<boolean>(true)
	const asimp = new AsistenciaImp()

	const tardanza = ref<number>(0)
	const ac = ref<number>()
	const falta = ref<boolean>(false)

	const escxpres = (e: KeyboardEvent) => {
		if (e.key == 'Escape') onShow.value = false
	}

	const save = async () => {
		try {
			const result = await asimp.add({
				dni: prop.dni,
				fecha: `2022-${prop.mes}-${prop.dia}`,
				tardanza: tardanza.value == null ? 0 : tardanza.value,
				acuenta: ac.value == 0 ? null : ac.value,
				falta: falta.value,
			})

			asisStore.addDay(result)
			onShow.value = false
		} catch (error) {
			console.log('error')
			console.log(error)
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		.button {
			button {
				color: $text-color;
				font-weight: 600;
				font-size: 0.85rem;
			}
		}
	}
	input {
		outline: none;
		max-width: 5rem;
		text-align: center;
		border: none;
		border-radius: 50px;
		background-color: $text-color-light;
		color: white;
		font-weight: 500;
		font-size: 0.6rem;
	}
	::-webkit-outer-spin-button,
	::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
	::placeholder {
		font-size: 0.6rem;
		letter-spacing: 0.5px;
	}

	.contenedor {
		display: flex;
		flex-direction: column;
		gap: 2vh;
		margin-bottom: 0.5vh;

		.guardar {
			text-align: center;
			button {
				width: min-content;
				height: min-content;
				font-size: 0.7rem;
				color: white;
				opacity: 0.8;
			}
			:focus {
				opacity: 1;
				border: none;
				outline: none;
				box-shadow: none;
			}
		}

		.acuenta,
		.tardanza {
			display: flex;
			gap: 1vh;
			justify-content: center;
			align-items: center;
			label {
				font-size: 0.6rem;
				font-weight: 500;
			}
		}
		.falta {
			width: 100%;
			button {
				width: 100%;
				border: none;
				outline: none;
				background-color: red;
				color: white;
				font-weight: 600;
				border-radius: 50px;
			}
			.falto {
				opacity: 1;
			}
			.no-falto {
				opacity: 0.4;
			}
		}
	}
</style>
