<template>
	<div class="app">
		<div class="search">
			<div class="field">
				<p class="control has-icons-left">
					<input
						class="input"
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
			<div v-for="e in empleados" :key="e.dni!" class="car">
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
		display: grid;
		grid-template-rows: min-content;
		align-items: flex-start;
		gap: 2vh;
		overflow-y: scroll !important;
		&::-webkit-scrollbar {
			width: 0.12rem;
		}

		&::-webkit-scrollbar-thumb {
			background: $primary;
		}

		&::-webkit-scrollbar-track {
			background: $background;
		}
		.search {
			display: flex;
			justify-content: center;
			align-items: center;
			padding-top: 2vh;
			i {
				color: $bsidebar;
			}
			.input {
				box-shadow: none;
				font-weight: 400;
			}
			@media (max-width: 1024px) {
				width: 100%;
				.input {
					text-align: center;
				}
			}
		}
		.resultados {
			display: grid;
			gap: 1rem;
			grid-auto-rows: auto-fill;
			grid-template-columns: repeat(auto-fit, minmax(9rem, 0.8fr));
			padding-bottom: 2vh;
			justify-content: center;
			align-items: flex-start;
			.car {
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}
	}
</style>
