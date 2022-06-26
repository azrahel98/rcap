<template>
	<div class="app">
		<div class="search">
			<div class="field">
				<p class="control has-icons-right">
					<input
						class="input is-rounded is-medium"
						type="email"
						v-model="nombre"
						placeholder="Email"
						:disable="isloading"
						:class="isloading ? 'is-loading' : ''"
					/>
					<span class="icon is-small is-right">
						<i class="fa-solid fa-users-viewfinder"></i>
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
		text-align: center;
		font-family: 'Fira Sans';
		font-weight: 400;
	}
	.app {
		padding-top: 8vh;
		width: 100%;
		height: 100vh;
		display: grid;
		grid-template-rows: 10vh auto;

		.search {
			display: flex;
			justify-content: center;
			align-items: center;
			i {
				color: black;
			}
		}
		.resultados {
			width: 100%;
			// overflow-y: scroll !important;
			max-height: 70vh;
			display: flex;
			justify-content: center;
			gap: 2vh;
			flex-wrap: wrap;
			@media (max-width: 1024px) {
				overflow-y: scroll !important;
			}
		}
	}
</style>
