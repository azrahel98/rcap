<template>
	<div class="app">
		<div class="topp">
			<p class="title">Bienvenido azrael</p>
			<div></div>
		</div>
		<div class="map">
			<mapbox-map :accessToken="token" class="mapa" :center="center" :zoom="13">
				<mapbox-marker :lngLat="[-76.937452, -12.213233]" :draggable="true">
					<mapbox-popup>
						<div>La municipalidad</div>
					</mapbox-popup>
				</mapbox-marker>

				<mapbox-marker :lngLat="[-76.973214, -12.199723]">
					<mapbox-popup>
						<div>Maestranza</div>
					</mapbox-popup></mapbox-marker
				>
				<mapbox-marker :lngLat="[-76.935029, -12.221419]">
					<mapbox-popup>
						<div>Base Alamos</div>
					</mapbox-popup></mapbox-marker
				>
			</mapbox-map>
		</div>
		<div class="places">
			<span>Aqui van a ir los lugares</span>
		</div>
	</div>
</template>

<script lang="ts" setup>
	import { ref, watchEffect } from 'vue'
	import env from '../../../env.json'

	const token = env.box

	const center = [-76.937527, -12.213317]

	const showmap = ref(localStorage.getItem('is_expanded') === 'true')

	watchEffect(() => {
		console.log(showmap.value)
	})
</script>

<style lang="scss" scoped>
	.app {
		display: grid;
		grid-template-rows: 12vh auto 20vh;

		.topp {
			display: flex;
			justify-content: space-between;
			gap: 13vh;
			text-align: left;
		}
		.map {
			width: 80%;
			height: 100%;
		}
	}
</style>
