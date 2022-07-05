<template>
	<div class="asistencia">
		<v-date-picker is-required v-model="customer" :model-config="model" />
		<Teleport to="body" v-if="ischange">
			<Modal @change="d"></Modal>
		</Teleport>
	</div>
</template>

<script lang="ts" setup>
	import 'v-calendar/dist/style.css'
	import { ref, watchEffect } from 'vue'
	import Modal from './modal.vue'

	const customer = ref()
	const ischange = ref(false)
	const d = (e) => {
		ischange.value = false
	}

	const model = {
		modelConfig: {
			type: 'string',
			mask: 'YYYY-MM-DD',
		},
	}

	watchEffect(() => {
		if (customer.value != undefined) {
			ischange.value = true
		}
	})
</script>

<style lang="ts" scoped></style>
