<template>
	<div class="appi">
		<div class="body" v-show="prfl !== undefined">
			<Profile
				class="profile"
				@completed="(e) => (prfl = e)"
				:dni="router.currentRoute.value.params.dni.toString()"
			/>
			<div class="cal">
				<div class="calaction">
					<div class="mes">
						<span class="material-icons" @click="before()">
							arrow_back_ios
						</span>
						<p>{{ getNameOfMonth(mesSeleccionado) }}</p>
						<span class="material-icons" @click="next()">
							arrow_forward_ios
						</span>
					</div>
					<div class="year">
						<h3>2022</h3>
					</div>
				</div>
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
			grid-template-rows: 12vh auto;
			row-gap: 4vh;
			height: 100%;
			width: 100%;
			align-items: flex-start;

			.cal {
				align-self: flex-start;
				justify-self: center;
				width: 100%;
				height: 100%;
				max-width: 90vh;
				padding-bottom: 5vh;
				.calaction {
					display: flex;
					max-width: 90vh;
					align-items: center;
					justify-content: space-around;
					padding-bottom: 1vh;
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
