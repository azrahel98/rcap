<template>
	<div class="app">
		<Detalle :empleado="employ" class="detalle"></Detalle>
		<div class="tablas">
			<Tabasis class="asiste"></Tabasis>
			<Tabasis class="asiste"></Tabasis>
				<Tabasis class="asiste"></Tabasis>
		</div>
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
		var jwt = jwtDecode(router.currentRoute.value.params.dni.toString())
		if (new Date(jwt['exp'] * 1000) < new Date()){
			router.push('notfound')
		}else{
				employ.value = await auth.detalles_employ(
			router.currentRoute.value.params.dni.toString()
			)
		}

	})
</script>

<style lang="scss" scoped>
	.app {
		height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		.detalle {
			height: min-content;
		}
		.tablas{
			display: flex;
			.asiste {
			width: 100%;
			height: min-content;
		}
		}
	}
</style>
