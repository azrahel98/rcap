<template>
	<div class="dash">
		<div class="app">
			<!-- <layout @change="recib"></layout> -->
			<Layout></Layout>
			<!-- <div class="te">
				<h3>s</h3>
			</div> -->
			<!-- <Menu></Menu> -->
			<div class="main" id="main">
				<router-view />
			</div>
		</div>
	</div>
</template>
<script lang="ts" setup>
	import { onMounted, ref } from 'vue'
	import { userStore } from '@store/user'
	import Layout from '@com/menu.vue'

	const user = userStore()
	onMounted(() => {
		user.InitAdmin()
	})
</script>
<style lang="scss" scoped>
	.dash {
		width: 100%;
		.app {
			width: 100%;
			display: grid;
			grid-template-columns: auto 1fr;
			grid-template-rows: 1fr;
			.main {
				width: 100%;
				height: 100vh;
			}
			// 	// margin-left: 12%;
			// 	// padding-right: 2%;
			// 	// @media (max-width: 1024px) {
			// 	// 	padding: 1vh 1vh 2vh 2vh;
			// 	// }
			// }
		}
	}
</style>
