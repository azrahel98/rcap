<template>
	<div class="profile">
		<div class="personal">
			<h1>{{ employ.nombre }}</h1>
			<span>{{ employ.dni }}</span>
		</div>
		<div class="cargo">
			<h6>{{ employ.area }}</h6>
			<h6>{{ employ.cargo }}</h6>
		</div>
	</div>
</template>

<script lang="ts" setup>
	import EmployImpl from '@/implement/employ'
	import { Employ } from '@/models/employ'
	import { onMounted, reactive, ref } from 'vue'

	const impl = new EmployImpl()

	var employ = ref<Employ>({})

	const prop = defineProps({
		dni: { required: true, type: String },
	})

	onMounted(async () => {
		employ.value = await impl.buscar_pordni(prop.dni)
		console.log(employ)
	})
</script>

<style lang="scss" scoped>
	.profile {
		padding-top: 4vh;
		justify-self: center;
		align-self: center;
		.personal {
			display: flex;
			flex-direction: column;
			align-items: center;
			span {
				color: $color-info-dark;
			}
		}
		.cargo {
			display: flex;
			gap: 4vh;
			flex-wrap: wrap;
			color: $color-dark;
		}
	}
</style>
