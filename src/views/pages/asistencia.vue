<template>
	<div class="appi">
		<div class="body" v-if="month_se !== undefined && month_se !== '0'">
			<div class="cal">
				<div class="adi">
					<h1>3</h1>
				</div>
				<div class="calem">
					<Calendar
						:memos="memo"
						:papeletas="pap"
						:marcaciones="marcaciones"
						:mes="month_se"
					/>
				</div>
			</div>
			<div class="profile">
				<Profile></Profile>
			</div>
		</div>
		<div class="selecct">
			<select
				class="form-select form-select-lg mb-3"
				aria-label=".form-select-lg example"
				v-model="month_se"
			>
				<option selected value="0">Selecciona un Mes</option>
				<option value="6">Junio</option>
				<option value="7">Julio</option>
				<option value="8">Agosto</option>
			</select>
		</div>
		<div class="loading"></div>
	</div>
</template>

<style lang="scss" scoped>
	.appi {
		width: 100%;
		height: 100vh;
		.body {
			display: flex;
			justify-content: space-between;
			.cal {
				overflow-y: scroll;
				width: 100%;
				display: grid;
				align-self: flex-start;
				grid-template-columns: 1fr;
				grid-template-rows: auto 1fr;
				.calem {
					justify-self: center;
					width: 100%;
				}
			}
			.profile {
				height: 100vh;
				width: 100%;
				min-width: 100px;
				max-width: 250px;
				align-self: flex-end;
				@media (max-width: 1024px) {
					display: none;
				}
				// background-color: olive;
			}
		}
	}
</style>

<script lang="ts" setup>
	import DocsImpl from '@/implement/docs'
	import EmployImpl from '@/implement/employ'
	import { AsistenciaDetalle } from '@/models/asistencia'
	import { Doc, Papeleta } from '@/models/documents'

	import Calendar from '@com/pages/asistencia/calendar.vue'
	import Profile from '@com/pages/asistencia/profile.vue'
	import { EmployStore } from '@store/employ'
	import { ref, watchEffect } from 'vue'
	import router from '../../router/router'

	const emplim = new EmployImpl()
	const docimp = new DocsImpl()

	const marcaciones = ref<AsistenciaDetalle[]>([])
	const pap = ref<Papeleta[]>([])
	const memo = ref<Doc[]>([])

	const em = EmployStore()

	const month_se = ref<any>(6)

	watchEffect(async () => {
		if (month_se.value !== '0' && month_se.value !== undefined) {
			marcaciones.value = await emplim.buscar_asistencia(
				router.currentRoute.value.params.dni as string,
				month_se.value
			)
			memo.value = await docimp.buscar_docs(
				router.currentRoute.value.params.dni as string,
				month_se.value
			)
			pap.value = await docimp.buscar_papeletas(
				router.currentRoute.value.params.dni as string,
				month_se.value
			)
		}
	})
</script>
