<template>
	<div class="searchp">
		<div class="psearch">
			<div class="pem">
				<h4>Buscar Trabajadores</h4>
				<span>{{ activos }} activos</span>
			</div>
			<div class="einp">
				<input v-model="nombre" @keyup.enter="search" />
			</div>
		</div>
		<div class="pbody">
			<div v-for="e in employs" :key="e.dni!" class="car">
				<Card
					:employ="e"
					:nombre="e.nombre!"
					:cargo="e.cargo!"
					:dni="e.dni!"
					:area="e.area!"
				/>
			</div>
		</div>
	</div>
</template>
<script lang="ts" setup>
	import { EmployImp } from '@/implement/employimp'
	import { Employ } from '@/model/employs'
	import { onMounted, reactive, ref } from 'vue'
	import { useToast } from 'vue-toastification'
	import Card from '@com/pages/empleados/card.vue'
	import { EmployStore } from '@store/employ'

	const imp = new EmployImp()
	const toast = useToast()

	const storemp = EmployStore()
	const activos = ref<number>()
	const employs = reactive<Employ[]>([])
	const nombre = ref<string>('')

	onMounted(async () => {
		if (storemp.cantidad == 0) activos.value = await imp.empleadosActivos()
	})

	const search = async () => {
		try {
			if (nombre.value.length >= 4) {
				employs.length = 0
				;(await imp.buscar_employName(nombre.value)).forEach((e) => {
					employs.push(e)
				})
			}
		} catch (error) {
			toast.warning((error as Error).message, {
				icon: {
					iconClass: 'material-icons',
					iconChildren: 'person_search',
					iconTag: 'span',
				},
			})
		}
	}
</script>
<style lang="scss" scoped>
	.searchp {
		display: grid;
		height: 100%;
		grid-template-rows: auto 1fr;
		width: 100%;
		.psearch {
			display: flex;
			gap: 2vh;
			justify-content: center;
			align-items: center;
			padding-top: 2vh;
			.pem {
				width: min-content;
				h4 {
					font-size: 1.2rem;
					font-weight: 700;
				}
				span {
					font-size: 0.75rem;
					color: $text-color;
					font-weight: 500;
				}
			}
			.einp {
				input {
					border-radius: 15px;
					text-align: center;
					height: 2.7vh;
					font-weight: 500;
					border: 1px solid black;
					box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.02);
					width: 25vh;
					font-size: 0.8rem;
					color: $text-color;
				}
			}
		}
		.pbody {
			display: flex;
			flex-wrap: wrap;
			width: auto;
			justify-content: center;
			gap: 2vh;

			.car {
				justify-self: center;
			}
		}
	}
</style>
