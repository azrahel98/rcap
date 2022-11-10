<template>
	<div class="contenedor">
		<Card v-for="_ in 19"></Card>
	</div>
</template>

<script lang="ts" setup>
	import Card from '../../components/pages/home/card.vue'
</script>

<style lang="scss" scoped>
	.contenedor {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(20vh, 1fr));
		gap: 1vh 1vh;

		article {
			background-color: gray;
			border: 1px solid white;
		}
	}
</style>
