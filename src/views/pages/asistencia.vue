<template>
	<div class="appi">
		<div class="body">
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
					class="calendario"
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
		.body {
			display: flex;
			flex-direction: column;
			gap: 4vh;
			.cal {
				.calaction {
					display: flex;
					justify-content: space-around;
					.mes {
						display: flex;
						font-weight: 600;
					}
				}
				.calendario {
					width: 100%;
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
