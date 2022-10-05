<template>
	<div class="calendario">
		<div class="month">
			<div class="mes">
				<div class="c-name">{{ MesString(currentMonth) }}</div>
				<div class="buttons">
					<i class="bx bx-left-arrow-circle" v-on:click="currentMonth -= 1"></i>
					<i
						class="bx bx-right-arrow-circle"
						v-on:click="currentMonth += 1"
					></i>
				</div>
			</div>
		</div>
		<div class="body">
			<div class="dias">
				<p>Lu</p>
				<p>Mar</p>
				<p>Mier</p>
				<p>Jue</p>
				<p>Vie</p>
				<p>Sab</p>
				<p>Dom</p>
			</div>
			<div class="cal">
				<div v-for="l in frisday() - 1"></div>
				<div
					class="card-day"
					:class="[
						marc.filter((e) => moment(e.fecha, 'YYYY-MM-DD').add(1).date() == i)
							.length == 0
							? 'not-work'
							: '',
					]"
					v-for="i in new Date(2022, prop.mes, 0).getDate()"
				>
					<h1>{{ i }}</h1>
					<div class="clock">
						<span
							v-for="i in marc.filter(
								(e) => moment(e.fecha, 'YYYY-MM-DD').add(1).date() == i
							)"
							>{{ i.hora.substring(0, 5) }}</span
						>
					</div>
					<div class="content">
						<div
							v-show="
								pps.filter(
									(e) => moment(e.fecha, 'YYYY-MM-DD').add(1).date() == i
								).length !== 0
							"
						>
							<button type="button" class="btn pp" :id="`ppver-pp-${i + 1}`">
								PP
								<span class="badge bg-secondary">{{
									pps.filter(
										(e) => moment(e.fecha, 'YYYY-MM-DD').add(1).date() == i
									).length
								}}</span>
							</button>
							<b-popover
								:target="`ppver-pp-${i + 1}`"
								triggers="focus"
								placement="top"
								class="pppover"
							>
								<div
									class="papeletas"
									v-for="e in pps.filter(
										(e) => moment(e.fecha, 'YYYY-MM-DD').add(1).date() == i
									)"
								>
									<div class="ppv-card">
										<div class="tools">
											<div class="circle">
												<span class="red box"></span>
											</div>
											<div class="circle">
												<span class="yellow box"></span>
											</div>
											<div class="circle">
												<span class="green box"></span>
											</div>
										</div>
										<div class="card__content">
											<span
												><i class="bx bxs-file-doc"></i>
												<h6>{{ e.pp }}</h6></span
											>
											<span
												><i class="bx bxs-calendar-check"></i>
												<h6>
													{{
														moment(e.fecha, 'YYYY-MM-DD').format('YYYY-MM-DD')
													}}
												</h6></span
											>
											<span
												><i class="bx bx-briefcase-alt"></i>
												<h6>{{ e.descrip }}</h6></span
											>
											<span
												><i class="bx bx-check-square"></i>
												<h6>{{ e.detalle }}</h6></span
											>
										</div>
									</div>
								</div>
							</b-popover>
						</div>

						<button
							type="button"
							class="btn dd"
							v-show="
								docs.filter((e) => moment(e.fecha).date() + 1 == i).length !== 0
							"
						>
							DC
							<span class="badge bg-secondary">{{
								docs.filter((e) => moment(e.fecha).date() + 1 == i).length
							}}</span>
						</button>
						<button
							type="button"
							class="btn dd"
							v-for="e in docs"
							v-show="
								moment({ day: i - 1, month: 7, years: 2022 }).isSameOrAfter(
									moment(moment(e.inicio).format('YYYY-MM-DD'))
								) &&
								moment({ day: i - 1, month: 7, years: 2022 }).isSameOrBefore(
									moment(moment(e.fin).format('YYYY-MM-DD'))
								)
							"
						>
							DC
							<span class="badge bg-secondary">{{
								docs.filter((e) => moment(e.fecha).date() + 1 == i).length
							}}</span>
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
	import { DocImpl } from '@/implement/docImpl'
	import { EmployImp } from '@/implement/employimp'
	import { RelojB } from '@/model/asistencia'
	import { Doc } from '@/model/doc/doc'
	import { PP } from '@/model/doc/pp'
	import moment from 'moment'
	import { onMounted, ref, watchEffect } from 'vue'
	import { MesString } from '../../../tools/calendar'

	const empimp = new EmployImp()
	const docimp = new DocImpl()
	const currentMonth = ref<number>(new Date().getMonth() + 1)

	const prop = defineProps({
		dni: { required: true, type: String },
		mes: { type: Number },
	})

	const pps = ref<PP[]>([])
	const docs = ref<Doc[]>([])
	const marc = ref<RelojB[]>([])

	watchEffect(async () => {
		marc.value = await empimp.buscar_asistencia(prop.dni, currentMonth.value)
		docs.value = await docimp.buscar_documentos(prop.dni, currentMonth.value)
		pps.value = await docimp.buscar_papeletas(prop.dni, currentMonth.value)
	})

	const frisday = () => {
		return new Date(`2022-${prop.mes}-01`).getDay()
	}
</script>
<style lang="scss" scoped>
	.papeletas {
		display: grid;
		.ppv-card {
			width: auto;
			height: max-content;
			background-color: #f8fbfe;
			border-radius: 8px;
			margin-top: 2px;
			.card__content {
				display: flex;
				flex-direction: column;
				flex-wrap: wrap;
				span {
					display: flex;
				}
			}
		}
	}
	.tools {
		display: flex;
		align-items: center;
		padding: 9px;
	}
	.circle {
		padding: 0 4px;
	}
	.box {
		display: inline-block;
		align-items: center;
		width: 10px;
		height: 10px;
		padding: 1px;
		border-radius: 50%;
	}
	.red {
		background-color: #ff605c;
	}
	.yellow {
		background-color: #ffbd44;
	}
	.green {
		background-color: #00ca4e;
	}
</style>
<style lang="scss" scoped>
	.calendario {
		display: grid;
		grid-template-rows: auto 1fr;
		.body {
			padding: 1vh 0.1vh 2vh 0.1vh;
			display: grid;
			.dias,
			.cal {
				display: grid;
				grid-template-columns: repeat(7, 1fr);
				align-items: center;
				justify-items: center;
			}
			.dias {
				column-gap: 2px;
				p {
					width: 100%;
					text-align: center;
				}
			}
			.cal {
				gap: 2px;
				.card-day {
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					align-items: center;
					padding-bottom: 1vh;
					background-color: white;
					height: 100%;
					width: 100%;
					border-radius: 10px;
					gap: 1vh;
					h1 {
						font-size: 1rem;
					}
					.clock {
						width: 100%;
						display: flex;
						flex-direction: row;
						flex-wrap: wrap;
						justify-content: space-around;
						align-items: center;
						span {
							font-size: 0.75rem;
						}
					}
					.content {
						display: flex;
						gap: 2px;
						flex-wrap: wrap;
						justify-content: center;
						align-items: center;
						width: 100%;

						button {
							font-size: 0.6rem;
							padding: 0;
							min-width: 5vh;
						}
						.pp {
							background-color: bisque;
						}
						.dd {
							background-color: aqua;
						}
					}
				}
				.not-work {
					background: rgba(143, 127, 127, 0.75);
					border-radius: 16px;
					box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
					backdrop-filter: blur(9.5px);
					-webkit-backdrop-filter: blur(9.5px);
					border: 1px solid rgba(143, 127, 127, 0.34);
				}
			}
		}
		.month {
			padding: 1vh 0 1vh 5vh;
			.mes {
				display: flex;
				font-family: 'Nunito', sans-serif;
				align-items: center;
				gap: 2vh;
				.c-name {
					font-size: 2rem;
					font-weight: 500;
				}
				.buttons {
					i {
						font-size: 1.7rem;
						cursor: pointer;
					}
				}
			}
			.cal {
				background-color: antiquewhite;
				height: 100%;
			}
		}
	}
</style>
