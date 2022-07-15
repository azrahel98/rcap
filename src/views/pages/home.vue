<template>
	<div class="app">
		<div class="map">
			<mapbox-map
				:accessToken="token"
				class="mapa"
				:center="center"
				:zoom="13.3"
			>
				<mapbox-marker :lngLat="[-76.937452, -12.213233]" :draggable="true">
					<mapbox-popup>
						<div class="marcador">
							<p>MUNICIPALIDAD</p>
						</div>
					</mapbox-popup>
				</mapbox-marker>

				<mapbox-marker :lngLat="[-76.973214, -12.199723]">
					<mapbox-popup>
						<div class="marcador">
							<p>Limpieza Publica</p>
						</div>
					</mapbox-popup>
				</mapbox-marker>
				<mapbox-marker :lngLat="[-76.935029, -12.221419]">
					<mapbox-popup className="popup">
						<div class="marcador">
							<p>Serenazgo</p>
							<p>Educacion</p>
							<p>Area de la Mujer</p>
							<p>Inclusion Social</p>
						</div>
					</mapbox-popup>
				</mapbox-marker>
				<mapbox-marker :lngLat="[-76.9339837, -12.215749]">
					<mapbox-popup className="popup">
						<div class="marcador">
							<p>Central de Camaras</p>
							<p>Fisca Adm</p>
							<p>Riesgo y Desastre</p>
						</div>
					</mapbox-popup></mapbox-marker
				>

				<!-- <mapbox-marker :lngLat="[-76.9296641, -12.2282669]">
					<mapbox-popup>
						<div>Warmi Salud</div>
					</mapbox-popup></mapbox-marker
				> -->
				<!-- -12.238675, -76.923864 -->
				<mapbox-marker :lngLat="[-76.923864, -12.238675]">
					<mapbox-popup>
						<div class="marcador">
							<p>Archivo Central</p>
						</div>
					</mapbox-popup></mapbox-marker
				>
				<!-- <mapbox-marker :lngLat="[-76.921582, -12.224102]">
					<mapbox-popup>
						<div>CIAM</div>
					</mapbox-popup></mapbox-marker
				> -->
				<!-- -12.224102, -76.921582 -->
				<!--  12.2282669,-76.9296641-->
				<!-- -12.2021373,-76.9356006 -->
				<mapbox-marker :lngLat="[-76.9356006, -12.2021373]">
					<mapbox-popup>
						<div class="marcador">
							<p>GDE</p>
							<p>SANIDAD</p>
						</div>
					</mapbox-popup>
				</mapbox-marker>
				<!-- -12.116638,-77.043603 -->
				<mapbox-marker :lngLat="[-76.952989, -12.211872]">
					<mapbox-popup>
						<div class="marcador">
							<p>OLIMPIADAS</p>
						</div>
					</mapbox-popup>
				</mapbox-marker>
			</mapbox-map>
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
		padding-top: 5vh;
		.marcador {
			color: white;
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			p {
				font-size: 1rem;
				font-weight: 600;
			}
		}
		.fa-solid {
			font-size: 2rem;
		}
	}
</style>
<style lang="scss">
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
</style>
