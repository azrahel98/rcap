<template>
	<div class="modal is-active">
		<div class="modal-background"></div>
		<div class="modal-content" v-click-outside="out">
			<h3>adfadf</h3>
		</div>
	</div>
</template>

<script lang="ts" setup>
	const emit = defineEmits(['change'])
	var clickz: number = 0
	const out = (e) => {
		clickz++

		if (clickz > 1 && clickz) {
			emit('change', true)
		}
	}
</script>

<style lang="scss" scoped>
	.modal-content {
		min-width: 70vh;
		background-color: white;
		border-radius: 15px;
		padding-bottom: 6vh;
	}
</style>
