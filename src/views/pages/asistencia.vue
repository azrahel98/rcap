<template>
	<div class="appi">
		<div class="body">
			<div class="cal">
				<h1>Registro de Asistencia</h1>
				<Calendar class="calem"></Calendar>
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
		height: 100vh;
		.body {
			display: grid;
			grid-template-columns: 3fr auto;
			padding-right: 1vh;
			width: 100%;
			column-gap: 2vh;
			padding-left: 2vh;
			height: 100vh;
			.cal {
				display: grid;
				grid-template-rows: auto auto 1fr;
				grid-template-columns: 1fr;
				row-gap: 5vh;
				justify-content: space-around;
				align-items: center;
				min-width: max-content;
				overflow-y: scroll;
				h1 {
					padding-top: 5vh;
					justify-self: center;
					font-weight: 500;
					color: $opaque;
				}
				.calem {
					justify-self: center;
					padding: 0;
					width: 100%;
					min-width: 100vh;
					max-width: 1500px;
				}
			}
			.profile {
				height: 100vh;
				width: auto;
			}
		}
	}
</style>

<script lang="ts" setup>
	import EmployImpl from '@/implement/employ'
	import { AsistenciaDetalle } from '@/models/asistencia'
	import Calendar from '@com/pages/asistencia/calendar.vue'
	import Profile from '@com/pages/asistencia/profile.vue'
	import { EmployStore } from '@store/employ'
	import { onMounted, ref } from 'vue'
	import router from '../../router/router'

	const emplim = new EmployImpl()

	const marcaciones = ref<AsistenciaDetalle[]>([])

	const em = EmployStore()

	onMounted(async () => {
		try {
			marcaciones.value = await emplim.buscar_asistencia(
				router.currentRoute.value.params.dni as string,
				'6'
			)
			em.loadRegistros(marcaciones.value)
		} catch (error) {
			console.log(232232)
		}
	})

	// import { Vue3Lottie } from 'vue3-lottie'
	// import { onMounted, ref, watchEffect } from 'vue'
	// import router from '../../router/router'

	// import EmployImpl from '@/implement/employ'
	// import DocsImpl from '@/implement/docs'
	// import { Employ } from '@/models/employ'

	// import { AsistenciaDetalle } from '@/models/asistencia'
	// import { Doc, Papeleta } from '@/models/documents'

	// import Loading from '@com/loading/loading.vue'
	// import Meses from '@com/pages/asist/meses.vue'
	// import Taback from '@com/pages/asist/taback.vue'
	// import { EmployStore } from '@store/employ'
	// import Infor from '@com/pages/asist/name/infor.vue'

	// const impl = new EmployImpl()
	// const employImp = new EmployImpl()
	// const docs = new DocsImpl()
	// const storempl = EmployStore()

	// const employ = ref<Employ>({})
	// const papeletas = ref<Papeleta[]>([])
	// const docss = ref<Doc[]>([])

	// const mesSeleccionado = ref<number>()

	// const isLoading = ref(true)
	// const searching = ref(true)

	// onMounted(async () => {
	// 	employ.value = await impl.buscar_pordni(
	// 		router.currentRoute.value.params.dni.toString()
	// 	)
	// 	storempl.changeDni(router.currentRoute.value.params.dni.toString())
	// 	isLoading.value = !isLoading.value
	// })

	// watchEffect(async () => {
	// 	if (mesSeleccionado.value !== undefined) {
	// 		searching.value = true
	// 		marcaciones.value = await employImp.buscar_asistencia(
	// 			employ.value.dni,
	// 			mesSeleccionado.value.toString()
	// 		)
	// 		papeletas.value = await docs.buscar_papeletas(
	// 			employ.value.dni,
	// 			mesSeleccionado.value
	// 		)
	// 		docss.value = await docs.buscar_docs(
	// 			employ.value.dni,
	// 			mesSeleccionado.value
	// 		)
	// 		searching.value = false
	// 	}
	// })
</script>
