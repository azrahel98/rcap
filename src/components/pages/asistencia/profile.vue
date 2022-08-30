<template>
	<div class="profile">
		<div class="avatar" :data-label="abrev" />
		<div class="personal">
			<h1>{{ employ.nombre }}</h1>
			<span>{{ employ.dni }}</span>
		</div>
		<div class="cargo">
			<span>{{ employ.area }}</span>
			<span>{{ employ.cargo }}</span>
		</div>
	</div>
</template>

<script lang="ts" setup>
	import EmployImpl from '@/implement/employ'
	import { Employ } from '@/models/employ'
	import { onMounted, ref, watch, watchEffect } from 'vue'

	const impl = new EmployImpl()
	var employ = ref<Employ>({})
	const e = defineEmits(['completed'])
	const abrev = ref<string>()

	const prop = defineProps({
		dni: { required: true, type: String },
	})

	// onMounted(async () => {
	// 	employ.value = await impl.buscar_pordni(prop.dni)
	// 	abrev.value = AbrevName()
	// 	e('completed', true)
	// })

	watchEffect(async () => {
		employ.value = await impl.buscar_pordni(prop.dni)
		abrev.value = AbrevName()
		e('completed', true)
	})

	function AbrevName(): string {
		let rgx = new RegExp(/(\p{L}{1})\p{L}+/, 'gu')

		let initials = [...employ.value.nombre.matchAll(rgx)] || []

		return (
			(initials.shift()?.[1] || '') + initials[1][1].toUpperCase() ||
			initials.pop()?.[1] ||
			''
		)
	}
</script>

<style lang="scss" scoped>
	.profile {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		span {
			color: $color-info-dark;
			font-weight: 600;
		}
		.avatar {
			width: 10vh;
			height: 10vh;
			border-radius: 50%;
			background-color: $color-primary;
			display: inline-flex;
			align-items: center;
			justify-content: center;
		}
		::after {
			content: attr(data-label);
			color: $color-white;
			font-weight: 600;
		}
		.personal {
			display: flex;
			flex-direction: column;
			align-items: center;
			h1 {
				font-size: 1.8rem;
				font-weight: 700;
				color: $color-dark;
			}
		}
		.cargo {
			display: flex;
			gap: 2vh;
			flex-wrap: wrap;
			color: $color-dark;
		}
	}
</style>
