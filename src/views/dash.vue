<template>
	<div class="dash">
		<div class="app">
			<!-- <layout @change="recib"></layout> -->
			<Layout></Layout>
			<!-- <Menu></Menu> -->
			<div class="main" id="main">
				<router-view />
			</div>
		</div>
	</div>
</template>
<script lang="ts" setup>
	import { onMounted, ref } from 'vue'
	import layout from '../components/layout.vue'
	import { userStore } from '@store/user'
	import Layout from '@com/menu.vue'

	const teleposhow = ref(true)
	const user = userStore()
	const recib = (e) => {
		teleposhow.value = e
	}
	onMounted(() => {
		user.InitAdmin()
	})
</script>
<style lang="scss" scoped>
	.dash {
		.app {
			.main {
				margin-left: 12%;
				padding-right: 2%;
				@media (max-width: 1024px) {
					padding: 1vh 1vh 2vh 2vh;
				}
			}
		}
	}
</style>
