<template>
	<div class="app">
		<Detalle :empleado="employ" class="detalle"></Detalle>
		<Tabasis class="asiste"></Tabasis>
	</div>
</template>

<script lang="ts" setup>
	import { onMounted, ref } from 'vue'
	import AuthImpl from '../../app/implement/auth'
	import { Employ } from '../../app/models/employ'
	import router from '../router/router'
	import Detalle from '../components/pages/auth/detalle.vue'
	import Tabasis from '../components/pages/auth/tabasis.vue'
	import jwtDecode from 'jwt-decode'

	const auth = new AuthImpl()

	const employ = ref<Employ>({})

	onMounted(async () => {
		employ.value = await auth.detalles_employ(
			router.currentRoute.value.params.dni.toString()
		)
		console.log(
			jwtDecode(router.currentRoute.value.params.dni.toString())['mes']
		)
	})
</script>

<style lang="scss" scoped>
	.app {
		height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		.detalle {
			height: max-content;
		}
		.asiste {
			height: max-content;
			max-width: max-content;
		}
	}
</style>
