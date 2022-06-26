<template>
	<div class="dash">
		<div class="app">
			<layout @change="recib"></layout>

			<div class="main" id="main">
				<router-view />
			</div>
		</div>
	</div>
</template>
<script lang="ts" setup>
	import { ref } from 'vue'
	import layout from '../components/layout.vue'

	const teleposhow = ref(true)
	const recib = (e) => {
		teleposhow.value = e
	}
</script>
<style lang="scss">
	.app {
		display: flex;
		height: 100vh;
		width: auto;
		.main {
			width: 100%;
			padding-top: 2.5vh;
			padding-left: 15%;
			padding-right: 15%;
			@media (max-width: 1024px) {
				padding: 1vh 1vh 2vh 2vh;
			}
		}
	}
</style>
