<template>
	<div>
		<div class="container-fluid">
			<div class="profile">
				<div class="card">
					<div class="card-c">
						<div class="card-border-top"></div>
						<div class="img"></div>
						<span>{{ employ.nombre }}</span>
						<p class="job">{{ employ.dni }}</p>
						<button><i class="bx bxs-edit"></i></button>
					</div>
					<div class="aditional">
						<div class="items">
							<i class="bx bxs-buildings"></i>
							<p>{{ employ.area }}</p>
						</div>
						<div class="items">
							<i class="bx bxs-briefcase-alt-2"></i>
							<p>{{ employ.cargo }}</p>
						</div>

						<div class="items">
							<i class="bx bxs-buildings"></i>
							<p>{{ moment(employ.ingreso).format('YYYY-MM-DD') }}</p>
						</div>
						<div class="items">
							<i class="bx bxs-buildings"></i>
							<p>{{ employ.regimen }}</p>
						</div>
					</div>
				</div>
				<div class="actions">
					<button data-bs-toggle="modal" :data-bs-target="`#m${dni}`">
						<div class="svg-wrapper-1">
							<div class="svg-wrapper">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="icon icon-tabler icon-tabler-settings-off"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									stroke-width="2"
									stroke="currentColor"
									fill="none"
									stroke-linecap="round"
									stroke-linejoin="round"
								>
									<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
									<path
										d="M9.456 5.435c.416 -.22 .745 -.609 .869 -1.118c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.187 1.016m-.126 3.666c-.516 .522 -1.348 .733 -2.123 .261a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.468 -.768 -.266 -1.59 .246 -2.108"
									></path>
									<path
										d="M9.879 9.878a3 3 0 1 0 4.256 4.23m.552 -3.444a3.012 3.012 0 0 0 -1.412 -1.38"
									></path>
									<path d="M3 3l18 18"></path>
								</svg>
							</div>
						</div>
						<span>PP</span>
					</button>
					<button data-bs-toggle="modal" :data-bs-target="`#p${dni}`">
						<div class="svg-wrapper-1">
							<div class="svg-wrapper">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="icon icon-tabler icon-tabler-file-plus"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									stroke-width="2"
									stroke="currentColor"
									fill="none"
									stroke-linecap="round"
									stroke-linejoin="round"
								>
									<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
									<path d="M14 3v4a1 1 0 0 0 1 1h4"></path>
									<path
										d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z"
									></path>
									<line x1="12" y1="11" x2="12" y2="17"></line>
									<line x1="9" y1="14" x2="15" y2="14"></line>
								</svg>
							</div>
						</div>
						<span>Doc</span>
					</button>
				</div>
			</div>
			<div class="card calendar"></div>
		</div>
		<Pp :dni="dni"></Pp>
		<Mm :dni="dni"></Mm>
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
		width: 100%;
		display: grid;
		grid-template-rows: auto auto;
		row-gap: 1vh;
		.card {
			width: 190px;
			height: 254px;
			background: #f0f0f0;
			border-radius: 10px;
			text-align: center;
			transition: all 0.5s;
		}
		.calendar {
			height: 20vh;
			width: 100%;
			border: none;
		}
		.profile {
			border: none;
			display: flex;
			flex-wrap: wrap;
			justify-content: center;
			align-items: center;
			gap: 2vh;
			width: 100%;

			.card {
				display: flex;
				flex-direction: row;
				gap: 2vh;
				width: auto;
				height: max-content;
				border: none;
				padding: 1vh 2vh 1vh 0.5vh;
				.card-c {
					min-width: 16vh;
					max-width: 20vh;
					height: max-content;
					background: #3405a3;
					border-radius: 15px;
					box-shadow: 1px 5px 60px 0px #100a886b;

					.card-border-top {
						width: 60%;
						height: 3%;
						background: #6b64f3;
						margin: auto;
						border-radius: 0px 0px 15px 15px;
					}
					span {
						font-weight: 600;
						color: white;
						text-align: center;
						display: block;
						padding-top: 10px;
						font-size: 16px;
					}
					.job {
						font-weight: 400;
						color: white;
						display: block;
						text-align: center;
						padding-top: 3px;
						font-size: 12px;
					}
					.img {
						width: 70px;
						height: 80px;
						background: #6b64f3;
						border-radius: 15px;
						margin: auto;
						margin-top: 25px;
					}
					button {
						padding: 8px 25px;
						display: block;
						margin: auto;
						border-radius: 8px;
						border: none;
						margin-top: 30px;
						background: #6b64f3;
						color: white;
						font-weight: 600;
						&:hover {
							background: #534bf3;
						}
					}
				}
				.aditional {
					display: flex;
					flex-direction: column;
					justify-content: center;
					.items {
						display: flex;
						justify-content: start;
						align-items: flex-start;
						gap: 1vh;
						i {
							color: royalblue;
							font-size: 1.2rem;
						}
						p {
							text-align: start;
							font-size: 0.7rem;
							font-weight: 500;
							font-family: 'Roboto', sans-serif;
						}
					}
				}
			}
			.actions {
				display: flex;
				height: min-content;
				gap: 2vh;
				button {
					font-family: inherit;
					font-size: 0.8rem;
					background: royalblue;
					color: white;
					padding: 0.7em 1em;
					padding-left: 0.9em;
					display: flex;
					align-items: center;
					border: none;
					border-radius: 16px;
					overflow: hidden;
					transition: all 0.2s;
					span {
						display: block;
						margin-left: 0.3em;
						transition: all 0.3s ease-in-out;
					}
					svg {
						display: block;
						transform-origin: center center;
						transition: transform 0.3s ease-in-out;
					}
					&:hover {
						.svg-wrapper {
							animation: fly-1 0.6s ease-in-out infinite alternate;
						}
						svg {
							transform: translateX(1.2em) rotate(45deg) scale(1.1);
						}
						span {
							transform: translateX(5em);
						}
					}
					&:active {
						transform: scale(0.95);
					}
				}
			}
		}
	}
</style>
