<template>
	<section class="hero">
		<div class="hero-body">
			<p class="title">
				{{ prop.empleado.nombre }}
			</p>
			<p class="subtitle">
				{{ prop.empleado.cargo }}
			</p>
		</div>
	</section>
</template>

<script lang="ts" setup>
	const prop = defineProps({
		empleado: { required: true, type: Object },
	})
</script>

<style lang="scss" scoped></style>
