<template>
	<div class="calendario">
		<div class="month">
			<button v-on:click="currentMonth -= 1">
				<div class="svg-wrapper-1">
					<div class="svg-wrapper">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="icon-arrow"
							width="18"
							height="18"
							viewBox="0 0 24 24"
							stroke-width="2"
							stroke="currentColor"
							fill="none"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
							<line x1="4" y1="12" x2="14" y2="12"></line>
							<line x1="4" y1="12" x2="8" y2="16"></line>
							<line x1="4" y1="12" x2="8" y2="8"></line>
							<line x1="20" y1="4" x2="20" y2="20"></line>
						</svg>
					</div>
				</div>
			</button>
			<div class="c-name">{{ MesString(currentMonth) }}</div>

			<button v-on:click="currentMonth += 1">
				<div class="svg-wrapper-1">
					<div class="svg-wrapper">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="icon-arrow"
							width="18"
							height="18"
							viewBox="0 0 24 24"
							stroke-width="2"
							stroke="currentColor"
							fill="none"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
							<line x1="20" y1="12" x2="10" y2="12"></line>
							<line x1="20" y1="12" x2="16" y2="16"></line>
							<line x1="20" y1="12" x2="16" y2="8"></line>
							<line x1="4" y1="4" x2="4" y2="20"></line>
						</svg>
					</div>
				</div>
			</button>
		</div>
		<div class="actions">
			<div class="tardanzat">
				<span
					><p>Tardanza</p>
					{{ asisStore.tardanzas }}</span
				>
				<span
					><p>Faltas</p>
					{{ asisStore.faltas }}</span
				>
			</div>
			<div class="checks">
				<div class="form-check">
					<input
						class="form-check-input"
						type="checkbox"
						value=""
						id="flexCheckDefault"
						v-model="asisStore.$state.showClock"
					/>
					<label class="form-check-label" for="flexCheckDefault">
						<i class="bx bx-time"></i>
					</label>
				</div>
				<div class="form-check">
					<input
						class="form-check-input"
						type="checkbox"
						value=""
						id="flexCheckChecked"
						v-model="asisStore.$state.showAs"
					/>
					<label class="form-check-label" for="flexCheckChecked">
						<i class="bx bx-exit"></i>
					</label>
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
				<div v-for="_l in frisday()"></div>
				<div
					class="card-day"
					v-for="i in new Date(2022, currentMonth, 0).getDate()"
				>
					<days
						:i="i"
						:docs="
							docs.filter(
								(e) =>
									moment(e['fecha'], 'YYYY-MM-DD').add(1).date() == i &&
									moment(e['fecha']).month() + 1 == currentMonth
							)
						"
						:pps="
							pps.filter(
								(e) => moment(e['fecha'], 'YYYY-MM-DD').add(1).date() == i
							)
						"
						:current-month="currentMonth"
						:marc="
							marc.filter(
								(e) => moment(e['fecha'], 'YYYY-MM-DD').add(1).date() == i
							)
						"
						:docr="
							docs.filter((e) =>
								moment({
									day: i,
									month: currentMonth - 1,
									years: 2022,
								}).isBetween(moment(e.inicio), moment(e.fin).add({ day: 1 }))
							)
						"
						:cdni="prop.dni"
					></days>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
	import { AsistenciaImp } from '@/implement/asistencia'
	import { DocImpl } from '@/implement/docImpl'
	import { EmployImp } from '@/implement/employimp'
	import { RelojB } from '@/model/asistencia'
	import { Doc } from '@/model/doc/doc'
	import { PP } from '@/model/doc/pp'
	import { AsistEstore } from '@store/asistencia'
	import moment from 'moment'
	import { onMounted, ref, watch } from 'vue'
	import { MesString } from '../../../tools/calendar'
	import Days from './days.vue'

	const asisStore = AsistEstore()
	const empimp = new EmployImp()
	const docimp = new DocImpl()
	const currentMonth = ref<number>(new Date().getMonth() + 1)

	const prop = defineProps({
		dni: { required: true, type: String },
	})

	const pps = ref<PP[]>([])
	const docs = ref<Doc[]>([])
	const marc = ref<RelojB[]>([])

	onMounted(async () => {
		marc.value = []
		docs.value = []
		pps.value = []
		asisStore.$state.mes = currentMonth.value
		asisStore.$state.asistencia = []
		marc.value = await empimp.buscar_asistencia(prop.dni, currentMonth.value)
		docs.value = await docimp.buscar_documentos(prop.dni, currentMonth.value)
		pps.value = await docimp.buscar_papeletas(prop.dni, currentMonth.value)
		asisStore.$state.asistencia = await new AsistenciaImp().search(
			prop.dni,
			currentMonth.value,
			2022
		)
	})

	watch(currentMonth, async (x, _y) => {
		marc.value = []
		docs.value = []
		pps.value = []
		asisStore.$state.mes = currentMonth.value
		asisStore.$state.asistencia = []
		marc.value = await empimp.buscar_asistencia(prop.dni, x)
		docs.value = await docimp.buscar_documentos(prop.dni, x)
		pps.value = await docimp.buscar_papeletas(prop.dni, x)
		asisStore.$state.asistencia = await new AsistenciaImp().search(
			prop.dni,
			x,
			2022
		)
	})

	const frisday = () => {
		const date = moment({
			year: 2022,
			month: currentMonth.value - 1,
			day: 1,
		}).day()
		if (date == 0) return 6
		return date - 1
	}
</script>

<style lang="scss" scoped>
	.calendario {
		height: 100%;
		display: grid;
		grid-template-rows: auto auto 1fr;
		row-gap: 1vh;
		.body {
			display: grid;
			background-color: $bg;
			border-radius: 10px 10px 50px 50px;
			.dias,
			.cal {
				display: grid;
				grid-template-columns: repeat(7, 1fr);
				align-items: center;
				justify-items: center;
			}
			.dias {
				gap: 2px;
				background-color: transparent;
				padding-top: 1vh;
				p {
					width: 100%;
					font-family: 'Fira Sans';
					color: gray;
					font-size: 0.8rem;
					font-weight: 500;
					text-align: center;
				}
			}
			.cal {
				gap: 2px;
				background-color: $bg;
				border-radius: 20px;

				.card-day {
					height: 100%;
					width: 100%;
					min-height: 5vh;
					width: 100%;
					border-radius: 10px;
				}
			}
		}
		.month {
			display: flex;
			font-family: 'Nunito', sans-serif;
			align-items: center;
			justify-content: space-around;
			width: 100%;
			.c-name {
				font-size: 2rem;
				font-weight: 600;
				text-align: center;
			}

			button {
				background: #c8c4e6;
				color: white;
				padding: 0.5vh;
				display: flex;
				align-items: center;
				border: none;
				border-radius: 16px;
				overflow: hidden;
				transition: all 0.2s;
				span {
					display: block;
					margin-left: 0.3em;
					font-size: 0.65rem;
					font-weight: 500;
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
						transform: translateX(1.2em) rotate(1deg) scale(1.1);
					}
					span {
						transform: translateX(5em);
					}
				}
				&:active {
					transform: scale(0.95);
				}
			}

			.cal {
				background-color: antiquewhite;
				height: 100%;
			}
		}
		.actions {
			display: flex;
			width: 100%;
			justify-content: space-around;
			gap: 2vh;
			align-items: center;
			.checks {
				display: flex;
				justify-content: center;
				align-items: center;
				gap: 3vh;
				.form-check {
					display: flex;
					gap: 1vh;
					justify-content: center;
					align-items: center;
					flex-wrap: wrap;
					label {
						font-size: 1.3rem;
					}
					input {
						text-align: center;
						background-color: #887ed6;
						border: none;
					}
					:focus {
						box-shadow: none;
						background-color: #887ed6;
					}
					:active {
						background-color: #887ed6;
					}
				}
			}
			.tardanzat {
				display: flex;
				flex-wrap: wrap;
				align-items: center;
				text-align: center;
				gap: 6vh;
				padding-top: 2vh;
				span {
					display: flex;
					font-size: 0.9rem;
					gap: 1vh;
					color: $text-color-light;
					font-weight: 700;
					text-align: center;
					p {
						font-size: 0.8rem;
						font-weight: 600;
						text-align: center;
						color: $text-color;
					}
				}
			}
		}
	}
</style>
