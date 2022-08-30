<template>
	<div class="appi">
		<div class="body" v-show="prfl !== undefined">
			<Profile
				class="profile"
				@completed="(e) => (prfl = e)"
				:dni="router.currentRoute.value.params.dni.toString()"
			/>
			<div class="calaction">
				<div class="mes">
					<span class="material-icons" @click="before()"> arrow_back_ios </span>
					<p>{{ getNameOfMonth(mesSeleccionado) }}</p>
					<span class="material-icons" @click="next()">
						arrow_forward_ios
					</span>
				</div>
				<div class="year">
					<h3>2022</h3>
				</div>
			</div>
			<div class="cal">
				<Calendar
					:mes="mesSeleccionado"
					:dni="router.currentRoute.value.params.dni.toString()"
				/>
			</div>
		</div>
		<Loadpure></Loadpure>
	</div>
</template>

<style lang="scss" scoped>
	.appi {
		width: 100%;
		height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		.body {
			display: grid;
			grid-template-rows: auto auto 1fr;
			row-gap: 2vh;
			height: 100%;
			width: 100%;
			.calaction {
				justify-self: center;
				display: flex;
				width: 100%;
				max-width: 110vh;
				align-items: center;
				justify-content: space-around;
				.mes {
					display: flex;
					align-items: center;
					justify-content: center;
					gap: 5vh;

					p {
						color: $color-dark;
						font-weight: 600;
						font-size: 1.2rem;
					}
					span {
						color: $color-primary;
						cursor: pointer;
						font-size: 1.8rem;
						font-weight: 600;
					}
				}
				.year {
					color: $color-dark;
					h3 {
						font-weight: 600;
						font-size: 1.2em;
						letter-spacing: 0.5vh;
					}
				}
			}
			.cal {
				align-self: center;
				justify-self: center;
				width: 100%;
				height: 100%;
				max-width: 110vh;
				padding-bottom: 5vh;
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
	import Loadpure from '@com/loading/loadpure.vue'

	import { getNameOfMonth } from '../../tools/date'

	const mesACtu = () => {
		var dt = new Date()
		return dt.getMonth() + 1
	}
	const mesSeleccionado = ref(mesACtu())
	const prfl = ref()

	function before() {
		if (mesSeleccionado.value >= 2) {
			--mesSeleccionado.value
		}
	}

	function next() {
		if (mesSeleccionado.value <= 11) {
			++mesSeleccionado.value
		}
	}
</script>
