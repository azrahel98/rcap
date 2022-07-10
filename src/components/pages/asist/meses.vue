<template>
	<div class="appi">
		<div v-for="x in meses">
			<div class="card" @click="select(x)" :class="mesSe == x ? 'active' : ''">
				<div class="card-content">
					<div class="content">
						<p>{{ x }}</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
	.appi {
		display: flex;
		justify-content: center;
		gap: 2vh;
		.card {
			height: 4vh;
			display: flex;
			justify-content: center;
			align-items: center;
			cursor: pointer;
			:hover {
				background-color: #d7d8e1;
			}
		}
	}
	.active {
		background: $primary;
		color: white;
	}
</style>

<script lang="ts" setup>
	import { ref, onMounted } from 'vue'

	const meses = ref<Array<Number>>([])
	const mesSe = ref<Number>()

	const e = defineEmits(['change'])

	var date = new Date().getMonth() + 1

	const select = (x: Number) => {
		mesSe.value = x
		e('change', mesSe.value)
	}

	onMounted(() => {
		for (let i = 0; i <= date; i++) {
			if (i >= 6) {
				meses.value.push(i)
			}
		}
	})
</script>
