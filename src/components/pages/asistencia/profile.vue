<template>
	<div class="profile">
		<div class="name">
			<div class="avatar">
				<!-- <div class="edit">
					<button>edit</button>
				</div> -->
				<img
					src="../../../assets/circle.png"
					class="rounded-circle"
					style="width: 150px"
					alt="Avatar"
				/>
				<!-- <div class="edit">
					<button>edit</button>
				</div> -->
			</div>
			<h6>{{ employ ? employ.nombre : '' }}</h6>
		</div>
	</div>
</template>

<script lang="ts" setup>
	import EmployImpl from '@/implement/employ'
	import { Employ } from '@/models/employ'
	import { onMounted, ref } from 'vue'
	import router from '../../../router/router'

	const impl = new EmployImpl()

	const employ = ref<Employ>()

	onMounted(async () => {
		employ.value = await impl.buscar_pordni(
			router.currentRoute.value.params.dni as string
		)
	})
</script>

<style lang="scss" scoped>
	.profile {
		border-radius: 25px;
		background-color: $background;
		width: 100%;
		height: 100%;
		display: grid;
		grid-template-rows: auto 1fr 1fr;
		padding-top: 3vh;
		max-width: 200px;
		.name {
			display: flex;
			flex-direction: column;
			width: 100%;
			align-items: center;
			gap: 2vh;
			.avatar {
				display: flex;
				justify-content: space-around;
				align-items: center;
			}
			h6 {
				text-align: center;
				font-size: 1rem;
				font-weight: 600;
			}
		}
	}
</style>
