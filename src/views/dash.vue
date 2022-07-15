<template>
	<div class="dash">
		<div class="app">
			<layout @change="recib"></layout>
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

	const teleposhow = ref(true)
	const user = userStore()
	const recib = (e) => {
		teleposhow.value = e
	}
	onMounted(() => {
		user.InitAdmin()
	})
</script>
<style lang="scss">
	.app {
		display: flex;
		height: 100vh;
		width: auto;
		.main {
			width: 100%;
			padding-top: 2.5vh;
			padding-left: 5%;
			padding-right: 5%;
			@media (max-width: 1024px) {
				padding: 1vh 1vh 2vh 2vh;
			}
		}
	}
</style>
