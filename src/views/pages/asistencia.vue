<template>
	<div class="appi">
		<div class="profile">
			<div class="face">
				<div class="avatar">
					<div class="av">

					</div>
				</div>
				<div class="details">
					<h1>{{employ.nombre}}</h1>
					<div class="aditionals">
						<p>{{employ.ingreso}}</p>
						<p>{{employ.cargo}}</p>
						<p>{{employ.area}}</p>
					</div>
				</div>
			</div>
		</div>
		<Dash :dni="router.currentRoute.value.params.dni.toString()" mes="6"/>
	</div>
</template>

<script lang="ts" setup>
	import { onMounted, ref } from 'vue'
	import EmployImpl from '../../../app/implement/employ'
	import router from '../../router/router'
	import { Employ } from './../../../app/models/employ'
	import Dash from '../../components/pages/asist/dash.vue'

	const employ = ref<Employ>({})
	const impl = new EmployImpl()

	onMounted(async () => {
		employ.value = await impl.buscar_pordni(
			router.currentRoute.value.params.dni.toString()
		)
	})
</script>

<style lang="scss" scoped>
	.appi {
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		gap: 2vh;
		.profile{
			height: max-content;
			display: flex;
			flex-direction: column;
			.face{
				display: flex;
				justify-content: space-around;
				align-items: center;
				gap: 3vh;
				width: 100%;
				.avatar{
						.av{
							border-radius: 100px;
						}
				}
				.details{
					display: flex;
					flex-direction: column;
					align-items: center;
					
					h1{
						font-weight: 500;
					}
					.aditionals{
						display: flex;
						font-size: 0.65rem;
						justify-content: space-evenly;
						align-items: flex-start;
						gap: 0.5vh;
						flex-wrap: wrap;
						p{
							color: $opaque;
							font-weight: 600 ;
						}
					}
				}
			}
		}
	}
</style>
