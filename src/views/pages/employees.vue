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
					<Card :nombre="e.nombre!" :cargo="e.cargo!" :dni="e.dni!" />
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
	<!-- <div class="search">
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
		</div> -->
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

	.pemploy {
		display: grid;
		justify-content: center;
		height: 100%;
		padding-top: 4vh;
		grid-template-rows: auto 4fr;
		gap: 2vh;
		.pbody {
			justify-self: center;
			.psearching {
				.lottie {
					height: 70vh;
				}
			}
			.presult {
				display: grid;
				grid-template-columns: repeat(4, 1fr);
				column-gap: 2vh;
				row-gap: 4vh;
				justify-content: center;
				align-items: center;
			}
		}
		.psearch {
			display: grid;
			align-items: center;
			justify-content: space-between;
			column-gap: 10vh;
			grid-template-columns: 0.5fr 1.5fr;
			.pem {
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
				align-self: center;
				justify-self: center;
				height: max-content;
				width: 100%;
			}
		}
	}
	// .app {
	// 	display: grid;
	// 	grid-template-rows: min-content;
	// 	align-items: flex-start;
	// 	gap: 2vh;
	// 	overflow-y: scroll !important;
	// 	&::-webkit-scrollbar {
	// 		width: 0.12rem;
	// 	}

	// 	&::-webkit-scrollbar-thumb {
	// 		background: $primary;
	// 	}

	// 	&::-webkit-scrollbar-track {
	// 		background: $background;
	// 	}
	// 	.search {
	// 		display: flex;
	// 		justify-content: center;
	// 		align-items: center;
	// 		padding-top: 2vh;
	// 		i {
	// 			color: $bsidebar;
	// 		}
	// 		.input {
	// 			box-shadow: none;
	// 			font-weight: 400;
	// 		}
	// 		@media (max-width: 1024px) {
	// 			width: 100%;
	// 			.input {
	// 				text-align: center;
	// 			}
	// 		}
	// 	}
	// 	.resultados {
	// 		display: grid;
	// 		gap: 1rem;
	// 		grid-auto-rows: auto-fill;
	// 		grid-template-columns: repeat(auto-fit, minmax(9rem, 0.8fr));
	// 		padding-bottom: 2vh;
	// 		justify-content: center;
	// 		align-items: flex-start;
	// 		.car {
	// 			display: flex;
	// 			align-items: center;
	// 			justify-content: center;
	// 		}
	// 	}
	// }
</style>
