<template>
	<router-view />
</template>

<script lang="ts" setup>
	import { userStore } from '@store/user'

	const store = userStore()

	store.InitAdmin()
</script>

<style lang="scss">
	.toast_custom {
		display: flex !important;
		width: 100%;
		padding-right: 2vh !important;
		justify-content: center !important;
		align-items: center !important;
		span {
			margin-right: 2vh !important;
		}
	}
</style>
