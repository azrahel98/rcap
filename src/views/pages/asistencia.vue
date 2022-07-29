<template>
	<div class="appi">
		<div class="body">
			<div class="cal">
				<h1>Registro de Asistencia</h1>
				<Calendar
					class="calem"
					:memos="memo"
					:papeletas="pap"
					:marcaciones="marcaciones"
				/>
				<div class="adi">
					<h1>3</h1>
				</div>
			</div>
			<div class="profile">
				<Profile></Profile>
			</div>
		</div>
		<div class="loading"></div>
	</div>
</template>

<style lang="scss" scoped>
	.appi {
		width: 100%;
		height: 100vh;
		.body {
			display: grid;
			grid-template-columns: 1fr auto;

			height: 100vh;
			justify-content: space-between;
			.cal {
				justify-self: center;
				display: grid;
				grid-template-rows: auto auto auto;
				overflow-y: auto;
				row-gap: 5vh;
				width: 100%;
				max-width: 1200px;

				h1 {
					padding-top: 5vh;
					justify-self: center;
					font-weight: 500;
					color: $opaque;
				}
				.calem {
					padding: 0;
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
	import { onMounted, ref } from 'vue'
	import router from '../../router/router'

	const emplim = new EmployImpl()
	const docimp = new DocsImpl()

	const marcaciones = ref<AsistenciaDetalle[]>([])
	const pap = ref<Papeleta[]>([])
	const memo = ref<Doc[]>([])

	const em = EmployStore()

	onMounted(async () => {
		marcaciones.value = await emplim.buscar_asistencia(
			router.currentRoute.value.params.dni as string,
			'6'
		)

		memo.value = await docimp.buscar_docs(
			router.currentRoute.value.params.dni as string,
			6
		)
		pap.value = await docimp.buscar_papeletas(
			router.currentRoute.value.params.dni as string,
			6
		)
	})
</script>
