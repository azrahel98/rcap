<template>
	<div class="appi">
		<div class="body">
			<Profile :dni="router.currentRoute.value.params.dni.toString()" />
			<div class="meses">
				<div class="radiob">
					<input
						type="radio"
						value="6"
						name="customRadio"
						v-model="mesSeleccionado"
					/>
					<label>JUNIO</label>
				</div>
				<div class="radiob">
					<input
						type="radio"
						value="7"
						name="customRadio"
						v-model="mesSeleccionado"
					/>
					<label>JULIO</label>
				</div>
				<div class="radiob">
					<input
						type="radio"
						value="8"
						name="customRadio"
						v-model="mesSeleccionado"
					/>
					<label>AGOSTO</label>
				</div>
				<div class="radiob">
					<input
						type="radio"
						value="9"
						name="customRadio"
						v-model="mesSeleccionado"
					/>
					<label>SEPTIEMBRE</label>
				</div>
				<div class="radiob">
					<input
						type="radio"
						value="10"
						name="customRadio"
						v-model="mesSeleccionado"
					/>
					<label>OCTUBRE</label>
				</div>
			</div>
			<div class="cal">
				<Calendar
					:mes="mesSeleccionado"
					:dni="router.currentRoute.value.params.dni.toString()"
				/>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
	.appi {
		width: 100%;
		height: 100vh;
		.body {
			display: grid;
			grid-template-rows: auto 1fr auto;
			row-gap: 2vh;
			.cal {
				align-self: center;
				justify-self: center;
				width: 100%;
				max-width: 90vh;
			}

			.meses {
				display: flex;
				gap: 3vh;
				justify-content: center;
				flex-wrap: wrap;

				.radiob {
					input {
						accent-color: $color-primary;
					}
					label {
						font-size: 0.8rem;
						padding-left: 0.3vh;
						font-weight: 500;
					}
				}
			}
		}
	}
</style>

<script lang="ts" setup>
	import Calendar from '@com/pages/asistencia/calendar.vue'
	import { ref } from 'vue'
	import router from '../../router/router'
	import Profile from '@com/pages/asistencia/profile.vue'

	const mesACtu = () => {
		var dt = new Date()
		return dt.getMonth()
	}
	const mesSeleccionado = ref(mesACtu())
</script>
