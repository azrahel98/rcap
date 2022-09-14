<template>
	<div
		class="modal fade"
		:id="`${prop.id}`"
		tabindex="-1"
		aria-labelledby="exampleModalLabel"
		aria-hidden="true"
	>
		<div class="modal-dialog modal-dialog-centered" role="document">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-body">
						<slot />
					</div>
				</div>
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
