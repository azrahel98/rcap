<template>
	<div class="pemploy">
		<div class="psearch">
			<div class="pem">
				<h4>Buscar Trabajadores</h4>
				<span>1576 activos</span>
			</div>
			<div class="einp">
				<input v-model="nombre" @keyup.enter="search" />
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
	import { ref } from 'vue'
	import { Vue3Lottie } from 'vue3-lottie'
	import EmployImp from '@/implement/employ'
	import Card from '@com/pages/empleados/card.vue'

	const nombre = ref<string>('')
	const isloading = ref(false)

	const employ = new EmployImp()
	const reg = new RegExp('[a-zA-Z]{4,}')
	const empleados = ref<Employ[] | null>([])

	const search = async () => {
		if (reg.test(nombre.value)) {
			isloading.value = false
			empleados.value = await employ.buscar_nombre(nombre.value)
			isloading.value = true
		}
	}
</script>
<style lang="scss" scoped>
	.pemploy {
		display: grid;
		grid-template-rows: 10vh auto;
		grid-template-columns: 1fr;
		width: 100%;
		height: 100vh;
		.pbody {
			width: 100%;
			justify-self: center;
			overflow-y: scroll;
			.psearching {
				.lottie {
					height: 70vh;
				}
			}
			.presult {
				display: grid;
				grid-template-columns: repeat(auto-fill, 19vh);
				grid-template-rows: 1fr;
				width: 100%;
				justify-content: center;
				align-content: center;
				align-items: flex-start;
				column-gap: 2vh;
				row-gap: 1vh;
				overflow: scroll;
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
					border-radius: 15px;
					text-align: center;
					height: 2.7vh;
					font-weight: 500;
					border: 0;
					box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.02);
				}
			}
		}
	}
</style>
