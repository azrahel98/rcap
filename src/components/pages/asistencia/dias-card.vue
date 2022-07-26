<template>
	<div class="d-card">
		<h1>{{ prop.day }}</h1>
	</div>
</template>
<script lang="ts" setup>
	import { AsistenciaDetalle } from '@/models/asistencia'
	import { EmployStore } from '@store/employ'
	import { onMounted, ref } from 'vue'
	const emp = EmployStore()
	const prop = defineProps({
		day: { type: Number, required: true },
		fs: { type: Boolean },
		fe: { type: Boolean },
		fi: { type: Boolean },
		color: { type: String },
	})
	const reloj = ref<AsistenciaDetalle[]>()
	onMounted(async () => {
		emp.registros.forEach((e) => {
			console.log(e)
		})
	})
</script>
<style lang="scss" scoped>
	.d-card {
		background-color: white;
		border: 1px solid black;
		height: 100%;
	}
</style>
