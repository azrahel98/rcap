<template>
	<div>
		<div class="container-fluid">
			<div class="info">
				<div class="employ">
					<div class="avatar" data-label="SDF" />
					<div class="details">
						<div>
							<i class="bx bx-user-pin"></i>
							<span>{{ employ.nombre }}</span>
						</div>
						<div>
							<i class="bx bx-id-card"></i>
							<span>{{ employ.dni }}</span>
						</div>
						<div>
							<i class="bx bx-briefcase"></i>
							<span>{{ employ.area }}</span>
						</div>
						<div>
							<i class="bx bxs-user-badge"></i>
							<span>{{ employ.cargo }}</span>
						</div>
						<div>
							<i class="bx bx-calendar"></i>
							<span>{{ moment(employ.ingreso).format('YYYY-MM-DD') }}</span>
						</div>
						<div>
							<i class="bx bxs-user-detail"></i>
							<span>{{ employ.regimen }}</span>
						</div>
					</div>
				</div>
				<div class="actions">
					<div class="icons-a">
						<button
							class="btn p"
							data-bs-toggle="modal"
							:data-bs-target="`#p${dni}`"
						>
							<span class="material-icons"> receipt_long </span>
						</button>
						<button
							class="btn m"
							data-bs-toggle="modal"
							:data-bs-target="`#m${dni}`"
						>
							<span class="material-icons"> description </span>
						</button>
					</div>
				</div>
			</div>
			<div class="cal">
				<Calendar :dni="dni" :mes="8"></Calendar>
			</div>
		</div>
		<Mm :dni="dni" />
		<Pp :dni="dni" />
	</div>
</template>

<script lang="ts" setup>
	import { EmployImp } from '@/implement/employimp'
	import { Employ } from '@/model/employs'
	import moment from 'moment'
	import { onMounted, reactive, ref } from 'vue'
	import router from '../../router/router'
	import Mm from '@com/modal/mm.vue'
	import Pp from '@com/modal/pp.vue'
	import Calendar from '@com/pages/calendario/calendar.vue'

	const employ = reactive<Employ>({})
	const impem = new EmployImp()

	const dni = ref<string>(router.currentRoute.value.params.dni as string)

	onMounted(async () => {
		try {
			var data = await impem.buscar_dni(
				router.currentRoute.value.params.dni as string
			)
			employ.area = data[0].area
			employ.cargo = data[0].cargo
			employ.dni = data[0].dni
			employ.horario = data[0].horario
			employ.ingreso = data[0].ingreso
			employ.nombre = data[0].nombre
			employ.regimen = data[0].regimen
		} catch (error) {
			console.log(error)
		}
	})
</script>

<style lang="scss" scoped>
	.container-fluid {
		display: grid;
		grid-template-rows: auto 1fr;
		row-gap: 5vh;
		margin-left: 0;
		padding-left: 0;

		.info {
			display: flex;
			flex-wrap: wrap;
			align-items: center;
			justify-content: center;
			height: min-content;
			.employ {
				margin-right: auto;
				display: flex;
				gap: 2vh;
				align-items: center;
				flex-wrap: wrap;
				justify-content: center;
				.details {
					div {
						display: flex;
						gap: 2vh;
						span {
							font-size: 0.7rem;
							font-weight: 500;
							color: $text-color;
						}
						i {
							font-weight: 500;
							font-size: 1.4rem;
							color: black;
						}
					}
				}
			}
			.actions {
				margin: auto;
				background-color: white;
			}
		}
		.cal {
			background-color: transparent;
		}
	}
	.avatar {
		width: 100px;
		height: 100px;
		border-radius: 50%;
		background-color: #7380ec;
		display: inline-flex;
		align-items: center;
		justify-content: center;
	}
	::after {
		content: attr(data-label);
		color: white;
		font-weight: 600;
	}
</style>
