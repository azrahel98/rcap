<template>
	<div class="app">
		<div class="hora">
			<span>{{ day[0] }}</span>
			<p>{{ day[1] }}</p>
		</div>
		<div>
			<h1>3</h1>
		</div>
		<div><h1>3</h1></div>
	</div>
</template>

<script lang="ts" setup>
	import { ref } from 'vue'
	import { GetStrinDate } from '../../tools/date'
	const day = ref(GetStrinDate())
</script>

<style lang="scss" scoped>
	.app {
		width: 100%;
		display: grid;
		padding-top: 1vh;
		grid-template-rows: 1fr 1fr 1fr;
		height: max-content;
		.hora {
			color: $alternative;
			justify-self: end;
			display: flex;
			gap: 1vh;
			font-size: 0.9rem;
			span {
				font-family: 'Poppins';
				font-weight: 600;
			}
			p {
				font-weight: 400;
			}
		}
	}
</style>
<!-- <style lang="scss">
	.mapboxgl-popup-content {
		background-color: $primary;
		opacity: 0.6;
		border: none;
		outline: none;
	}
	.mapboxgl-popup-tip {
		height: 5px;
		border-radius: 50px;
		border-color: blue !important;
	}
</style> -->
