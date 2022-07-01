<template>
	<div class="app">
		<Detalle :empleado="employ" class="detalle"></Detalle>
		<Tabasis class="asiste"></Tabasis>
	</div>
</template>

<script lang="ts" setup>
	import { onMounted, ref } from 'vue'
	import AuthImpl from '../../app/implement/auth'
	import { AsistenciaDetalle } from '../../app/models/asistencia'
	import { Employ } from '../../app/models/employ'
	import router from '../router/router'
	import Detalle from '../components/pages/auth/detalle.vue'
	import Tabasis from '../components/pages/auth/tabasis.vue'

	const auth = new AuthImpl()

	const employ = ref<Employ>({})

	onMounted(async () => {
		employ.value = await auth.detalles_employ(
			router.currentRoute.value.params.dni.toString()
		)
	})
</script>

<style lang="scss" scoped>
	.app {
		height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: start;
		align-items: center;
		gap: 5vh;

		.asiste {
			height: 100%;
			max-width: max-content;
		}
	}
</style>
