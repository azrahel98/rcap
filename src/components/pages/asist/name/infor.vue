<template>
	<div class="employ">
		<div class="avatar">
			<img src="../../../../assets/broker.png" alt="" />
		</div>
		<div class="informacion">
			<h1 class="title">{{ employ.nombre }}</h1>
			<div class="items">
				<div class="i i-1">
					<i class="fa-solid fa-address-card"></i>
					<h4>{{ employ.dni }}</h4>
				</div>
				<div class="i i-2">
					<i class="fa-solid fa-user-tie"></i>
					<h4>{{ employ.area }}</h4>
				</div>
				<div class="i i-3">
					<i class="fa-solid fa-user-tag"></i>
					<h4>{{ employ.cargo }}</h4>
				</div>
				<div class="i i-4">
					<i class="fa-solid fa-calendar-plus"></i>
					<h4>{{ employ.ingreso }}</h4>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
	import { Employ } from '@/models/employ'

	const props = defineProps({
		employ: { required: true, type: Object },
	})

	const employ: Employ = props.employ as Employ
</script>

<style lang="scss" scoped>
	.employ {
		display: grid;
		grid-template-columns: minmax(5vh, 10vh) auto;
		align-items: center;
		justify-content: center;
		justify-items: center;
		// border: 1px solid red;
		.avatar {
			width: 100%;
		}
		.informacion {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: start;
			width: 100%;
			height: 100%;
			.title {
				text-align: left;
			}
			.items {
				display: flex;
				justify-content: space-arounds;
				gap: 2vh;
				flex-wrap: wrap;
				.i {
					display: flex;
					flex-direction: row;
					gap: 0.5rem;
					align-items: center;
					justify-content: flex-start;
					i {
						min-width: 30px;
					}
					h4 {
						font-size: 0.75rem;
					}
				}
				.i-2 {
					gap: 0;
					h4 {
						text-align: left;
					}
				}
			}
		}
	}
</style>
