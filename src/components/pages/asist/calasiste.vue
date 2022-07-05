<template>
	<v-calendar :attributes="attributes" is-expanded class="calendar">
		<template v-slot:day-content="{ day, attributes }">
			<div class="dia">
				<span>{{ day.day }}</span>
				<div class="vc-contenido">
					<p
						v-for="attr in attributes"
						:key="attr.key"
						class="text-xs leading-tight rounded-sm p-1 mt-0 mb-1"
						:class="attr.customData.class"
					>
						{{ attr.customData.title }}
					</p>
				</div>
			</div>
		</template>
	</v-calendar>
</template>
<script lang="ts" setup>
	import EmployImp from '../../../../app/implement/employ'
	import { onMounted, ref } from 'vue'
	import { AsistenciaDetalle } from '../../../../app/models/asistencia'
	import { AgregarDias } from '../../../../app/tools/auth'

	const attributes = ref()
	const data = new EmployImp()
	const employ = ref<AsistenciaDetalle[]>([])

	const prop = defineProps({
		dni: { type: String, required: true },
		mes: { type: Number, required: true },
	})

	onMounted(async () => {
		employ.value = await data.buscar_asistencia(prop.dni, prop.mes.toString())
		attributes.value = AgregarDias(employ.value)
	})
</script>

<style lang="scss" scoped>
	.calendar {
		.vc-contenido {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			align-items: center;
			.dia {
				width: min-content;
			}
			.vc-detalle {
				font-size: 0.75rem;
				background-color: #623ce7;
				border-radius: 15px;
				color: white;
			}
		}
	}
</style>
