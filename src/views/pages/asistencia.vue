<template>
	<div class="appi">
		<div class="asist" v-if="!isLoading">
			<Infor :employ="employ" class="employ" />
			<div class="dash">
				<Meses class="mes" @change="(x) => (mesSeleccionado = x)" />
				<div class="tablaas" v-if="mesSeleccionado != null">
					<Vue3Lottie
						class="nullable"
						v-if="searching"
						animationLink="https://assets3.lottiefiles.com/private_files/lf30_e3pteeho.json"
					/>
					<Taback
						v-else
						:mes="mesSeleccionado"
						class="back"
						:papeletas="papeletas"
						:marcaciones="marcaciones"
						:docs="docss"
					/>
				</div>
				<Vue3Lottie
					class="empty"
					v-else
					animationLink="https://assets3.lottiefiles.com/private_files/lf30_e3pteeho.json"
				/>
			</div>
		</div>
		<div class="loading" v-else><Loading /></div>
	</div>
</template>

<style lang="scss" scoped>
	.appi {
		.asist {
			display: grid;
			grid-template-rows: auto-fill 1fr;
			gap: 4vh;
			.employ {
				max-height: min-content;
			}
			.dash {
				display: grid;
				grid-template-rows: auto-fill 1fr;
				gap: 2vh;
				.mes {
					height: min-content;
				}
				.tablaas {
					display: flex;
					height: 100%;
					flex-wrap: wrap;
					align-items: flex-start;
					gap: 2vh;
					justify-content: center;
					.nullable {
						height: 30vh;
					}
					.back {
						width: 100%;
						height: 100%;
					}
				}
				.empty {
					height: 50%;
				}
			}
		}
		.loading {
			display: flex;
			align-items: center;
			justify-content: center;
			height: 100%;
		}
	}
</style>

<script lang="ts" setup>
	import { Vue3Lottie } from 'vue3-lottie'
	import { onMounted, ref, watchEffect } from 'vue'
	import router from '../../router/router'

	import EmployImpl from '@/implement/employ'
	import DocsImpl from '@/implement/docs'
	import { Employ } from '@/models/employ'

	import { AsistenciaDetalle } from '@/models/asistencia'
	import { Doc, Papeleta } from '@/models/documents'

	import Loading from '@com/loading/loading.vue'
	import Meses from '@com/pages/asist/meses.vue'
	import Taback from '@com/pages/asist/taback.vue'
	import { EmployStore } from '@store/employ'
	import Infor from '@com/pages/asist/name/infor.vue'

	const impl = new EmployImpl()
	const employImp = new EmployImpl()
	const docs = new DocsImpl()
	const storempl = EmployStore()

	const employ = ref<Employ>({})
	const marcaciones = ref<AsistenciaDetalle[]>([])
	const papeletas = ref<Papeleta[]>([])
	const docss = ref<Doc[]>([])

	const mesSeleccionado = ref<number>()

	const isLoading = ref(true)
	const searching = ref(true)

	onMounted(async () => {
		employ.value = await impl.buscar_pordni(
			router.currentRoute.value.params.dni.toString()
		)
		storempl.changeDni(router.currentRoute.value.params.dni.toString())
		isLoading.value = !isLoading.value
	})

	watchEffect(async () => {
		if (mesSeleccionado.value !== undefined) {
			searching.value = true
			marcaciones.value = await employImp.buscar_asistencia(
				employ.value.dni,
				mesSeleccionado.value.toString()
			)
			papeletas.value = await docs.buscar_papeletas(
				employ.value.dni,
				mesSeleccionado.value
			)
			docss.value = await docs.buscar_docs(
				employ.value.dni,
				mesSeleccionado.value
			)
			searching.value = false
		}
	})
</script>
