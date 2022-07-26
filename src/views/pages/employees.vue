<template>
	<div class="pemploy">
		<div class="psearch">
			<div class="pem">
				<h4>Buscar Trabajadores</h4>
				<span>1576 activos</span>
			</div>
			<div class="einp">
				<input v-model="nombre" />
			</div>
		</div>
		<div class="pbody">
			<div class="presult" v-if="isloading">
				<div v-for="e in empleados" :key="e.dni!" class="car">
					<Card
						:nombre="e.nombre!"
						:cargo="e.cargo!"
						:dni="e.dni!"
						:area="e.area!"
						:ingreso="e.ingreso!"
					/>
				</div>
			</div>
			<div class="psearching" v-else>
				<Vue3Lottie
					class="lottie"
					animationLink="https://assets4.lottiefiles.com/packages/lf20_nninlpvr.json"
				/>
			</div>
		</div>
	</div>
</template>
<script lang="ts" setup>
	import { Employ } from '@/models/employ'
	import { ref, watchEffect } from 'vue'
	import { Vue3Lottie } from 'vue3-lottie'
	import EmployImp from '@/implement/employ'
	import Card from '@com/pages/empleados/card.vue'

	const nombre = ref<string>('')
	const isloading = ref(false)

	const employ = new EmployImp()
	const reg = new RegExp('[a-zA-Z]{4,}')
	const empleados = ref<Employ[] | null>([])

	watchEffect(async () => {
		console.log(nombre.value)
		if (reg.test(nombre.value)) {
			isloading.value = false
			empleados.value = await employ.buscar_nombre(nombre.value)
			isloading.value = true
		}
	})
</script>
<style lang="scss" scoped>
	.pemploy {
		display: grid;
		justify-content: center;
		padding-top: 4vh;
		grid-template-rows: auto 4fr;
		gap: 2vh;
		width: 100%;
		height: 100vh;
		.pbody {
			height: 100%;
			.psearching {
				.lottie {
					height: 70vh;
				}
			}
			.presult {
				padding-left: 2vh;
				display: grid;
				grid-template-columns: repeat(2, 1fr);
				column-gap: 2vh;
				row-gap: 4vh;
				height: 100%;
				overflow: auto;
			}
		}
		.psearch {
			display: grid;
			grid-template-columns: auto auto;
			column-gap: 5vh;
			align-items: center;
			justify-content: center;
			.pem {
				width: min-content;
				h4 {
					font-size: 1.2rem;
					font-weight: 700;
				}
				span {
					font-size: 0.68rem;
					color: $alternative;
				}
			}
			.einp {
				width: min-content;
				align-self: center;
				justify-self: center;
				height: max-content;
				input {
					text-align: left;
					font-family: 'Fira Sans' !important;
					font-weight: 500 !important;
					border: 1px solid $alternative;
					border-radius: 10px;
					color: $alternative;
					font-family: 'Roboto' !important;
					font-size: 0.7rem;
					text-align: center;
					min-height: 3.7vh;
					width: max-content;
				}
			}
		}
	}
</style>
