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
					animationLink="https://assets10.lottiefiles.com/packages/lf20_nrtm9xfr.json"
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
		height: 100% !important;
		grid-template-rows: auto 1fr;
		width: 100%;
		height: 100vh;
		.pbody {
			padding-top: 2vh;
			.psearching {
				.lottie {
					height: 20em;
				}
			}
			.presult {
				display: flex;
				flex-wrap: wrap;
				width: auto;
				height: 100vh;
				justify-content: center;
				gap: 2vh;
				padding-bottom: 13vh;
				overflow-y: auto;
				.car {
					justify-self: center;
				}
			}
		}
		.psearch {
			display: flex;
			gap: 2vh;
			justify-content: center;
			align-items: center;
			padding-top: 1vh;
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
				input {
					border-radius: 15px;
					text-align: center;
					height: 2.7vh;
					font-weight: 500;
					border: 1px solid $alternative;
					box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.02);
					width: 25vh;
					font-size: 0.8rem;
				}
			}
		}
	}
</style>
