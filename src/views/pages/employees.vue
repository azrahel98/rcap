<template>
	<div class="app">
		<div class="search">
			<div class="field">
				<p class="control has-icons-left">
					<input
						class="input is-medium"
						type="text"
						v-model="nombre"
						:disable="isloading"
						:class="isloading ? 'is-loading' : ''"
					/>
					<span class="icon is-small is-left">
						<i class="fa-brands fa-searchengin"></i>
					</span>
				</p>
			</div>
		</div>
		<div class="resultados" id="resultado">
			<div v-for="e in empleados" :key="e.dni!">
				<Card :nombre="e.nombre!" :cargo="e.cargo!" :dni="e.dni!" />
			</div>
		</div>
	</div>
</template>
<script lang="ts" setup>
	import { ref, watchEffect } from 'vue'
	import EmployImp from '../../../app/implement/employ'
	import Card from '../../components/pages/empleados/card.vue'
	import { Employ } from '../../../app/models/employ'

	const nombre = ref<string>('')
	const isloading = ref(false)

	const employ = new EmployImp()
	const reg = new RegExp('[a-zA-Z]{4,}')
	const empleados = ref<Employ[] | null>([])

	watchEffect(async () => {
		if (reg.test(nombre.value)) {
			isloading.value = true
			empleados.value = await employ.buscar_nombre(nombre.value)
			isloading.value = false
		}
	})
</script>
<style lang="scss" scoped>
	input {
		text-align: left;
		font-family: 'Fira Sans' !important;
		font-weight: 600 !important;
		border: none;
		background-color: $primary;
		border-radius: 10px;
		color: $bsidebar;
	}
	.app {
		width: 100%;
		height: 100vh;
		display: grid;
		gap: 5vh;
		grid-template-rows: 5vh auto;

		.search {
			display: flex;
			justify-content: center;
			align-items: center;
			i {
				color: $bsidebar;
			}
			.input {
				box-shadow: none;
				font-weight: 400;
			}
			@media (max-width: 1024px) {
				width: 85%;
				.input {
					text-align: center;
				}
			}
		}
		.resultados {
			width: 100%;
			height: 100%;
			padding-bottom: 4vh;
			display: flex;
			justify-content: space-evenly;
			overflow: scroll !important;
			gap: 2vh;
			flex-wrap: wrap;
			word-wrap: normal;

			&::-webkit-scrollbar {
				width: 0.15rem;
			}

			&::-webkit-scrollbar-thumb {
				background: $primary;
			}

			&::-webkit-scrollbar-track {
				background: $background;
			}
		}
	}
</style>
