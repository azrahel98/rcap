<template>
	<div
		class="modal fade"
		:id="`${prop.id}`"
		tabindex="-1"
		role="dialog"
		aria-hidden="true"
	>
		<div class="modal-dialog modal-dialog-centered" role="document">
			<div class="modal-content">
				<slot />
			</div>
		</div>
	</div>
</template>
<script lang="ts" setup>
	const prop = defineProps({
		id: { required: true },
	})
</script>
<style lang="scss" scoped></style>
