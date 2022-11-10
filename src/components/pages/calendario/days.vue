<template>
	<div
		:class="[
			prop.docr.length !== 0 ? 'card-day-r' : 'card-day',
			asitore.getAsisinDay(prop.i).length == 1 &&
			asitore.getAsisinDay(prop.i)[0]['falta'] == 1
				? 'not-work'
				: '',
			asitore.getAsisinDay(prop.i).length == 1 ? 'tardanzas' : '',
			search('DF', prop.pps, 'permiso').length == 0 ? '' : 'df',
			search('DF', prop.docr, 'tipoP').length == 0 ? '' : 'df',
		]"
	>
		<day-popover
			:dia="prop.i"
			:dni="prop.cdni"
			:mes="currentMonth"
			v-if="prop.docr.length == 0 && userStor.admin"
		></day-popover>
		<h3 class="day-color" v-else>{{ prop.i }}</h3>
		<div class="clock" v-if="asitore.$state.showClock">
			<span v-for="i in prop.marc">{{
				(i as any)['hora'].substring(0, 5)
			}}</span>
		</div>
		<div class="tardanza" v-if="asitore.$state.showAs">
			<span
				v-for="y in asitore.getAsisinDay(prop.i).length == 1
					? asitore.getAsisinDay(prop.i)
					: []"
				>{{ y['tardanza'] }}</span
			>
		</div>
		<div class="content" v-if="asitore.$state.showClock">
			<div v-if="prop.pps.length !== 0">
				<button type="button" class="btn pp" :id="`ppver-pp-${i + 1}`">
					<span class="badge bg-secondary">{{ prop.pps.length }}</span>
				</button>
				<b-popover
					:target="`ppver-pp-${i + 1}`"
					triggers="focus"
					ref="popover"
					placement="auto"
				>
					<div class="pp-container">
						<div class="ppv-card" v-for="e in (prop.pps as Array<PP>)">
							<span class="nombre">{{ e.pp }}</span>
							<span class="permiso">{{ e.permiso }}</span>
							<span>{{ e.descrip }}</span>
							<span>{{ e.detalle }}</span>
						</div>
					</div>
				</b-popover>
			</div>

			<div
				v-if="prop.docs.length !== 0 && prop.docs.filter((e:any) => moment(e['fecha']).month() + 1 == currentMonth) "
			>
				<button type="button" class="btn dd" :id="`ppver-dc-${i + 1}`">
					<span class="badge bg-secondary">{{ prop.docs.length }}</span>
					<b-popover
						:target="`ppver-dc-${i + 1}`"
						triggers="focus"
						ref="popover"
						placement="auto"
					>
						<div class="pp-container">
							<div class="ppv-card" v-for="e in (prop.docs as Array<any>)">
								<span class="nombre">{{ e.docName }}</span>
								<span class="permiso">{{ e.tipoP }}</span>
								<span class="permiso">{{ e.tipoD }}</span>
								<span>{{ e.descrip }}</span>
								<span class="ref">{{ e.ref }}</span>
							</div>
						</div>
					</b-popover>
				</button>
			</div>
			<!-- <button
				v-if="prop.docr.length !== 0"
				class="btn dr"
				:id="`ppver-dr-${i + 1}`"
			>
				DC
				<span class="badge bg-secondary">{{ prop.docr.length }}</span>
				<b-popover
					:target="`ppver-dr-${i + 1}`"
					triggers="focus"
					ref="popover"
					placement="auto"
				>
					<div class="pp-container">
						<div class="ppv-card" v-for="e in (prop.docr as Array<any>)">
							<span class="nombre">{{ e.docName }}</span>
							<span class="permiso">{{ e.tipoP }}</span>
							<span class="permiso">{{ e.tipoD }}</span>
							<span>{{ e.descrip }}</span>
							<span class="ref">{{ e.ref }}</span>
						</div>
					</div>
				</b-popover>
			</button> -->
		</div>
		<div class="docs-range" v-if="prop.docr.length !== 0">
			<button
				v-if="moment((prop.docr[0] as Doc).inicio,'YYYY-MM-DD').add(1).date() == i"
				class="btn dr"
				:id="`ppver-dr-${i + 1}`"
			>
				<span class="badge bg-secondary">{{ prop.docr.length }}</span>
				<b-popover
					:target="`ppver-dr-${i + 1}`"
					triggers="focus"
					ref="popover"
					placement="auto"
				>
					<div class="pp-container">
						<div class="ppv-card" v-for="e in (prop.docr as Array<any>)">
							<span class="nombre">{{ e.docName }}</span>
							<span class="permiso">{{ e.tipoP }}</span>
							<span class="permiso">{{ e.tipoD }}</span>
							<span>{{ e.descrip }}</span>
							<span class="ref">{{ e.ref }}</span>
						</div>
					</div>
				</b-popover>
			</button>
			<button
				v-if="moment((prop.docr[0] as Doc).fin,'YYYY-MM-DD').add(1).date() == i"
				class="btn dr"
				:id="`ppver-dr-f${i + 1}`"
			>
				<span class="badge bg-secondary">{{ prop.docr.length }}</span>
				<b-popover
					:target="`ppver-dr-f${i + 1}`"
					triggers="focus"
					ref="popover"
					placement="auto"
				>
					<div class="pp-container">
						<div class="ppv-card" v-for="e in (prop.docr as Array<any>)">
							<span class="nombre">{{ e.docName }}</span>
							<span class="permiso">{{ e.tipoP }}</span>
							<span class="permiso">{{ e.tipoD }}</span>
							<span>{{ e.descrip }}</span>
							<span class="ref">{{ e.ref }}</span>
						</div>
					</div>
				</b-popover>
			</button>
		</div>
	</div>
</template>

<script lang="ts" setup>
	import { PP } from '../../../../app/model/doc/pp'
	import moment from 'moment'
	import { AsistEstore } from '@store/asistencia'
	import { userStore } from '@store/user'
	import DayPopover from '../../poppover/day.vue'
	import { Doc } from '@/model/doc/doc'

	const asitore = AsistEstore()
	const userStor = userStore()
	const prop = defineProps({
		i: { type: Number, required: true },
		marc: { type: Array, required: true },
		pps: { type: Array, required: true },
		docs: { type: Array, required: true },
		docr: { type: Array, required: true },
		currentMonth: { type: Number, required: true },
		cdni: { type: String, required: true },
		falta: { type: Boolean },
	})

	const search = (perm: string, arr: Array<any>, param: string) => {
		return arr.filter((e: any) => e[`${param}`] === perm)
	}
</script>
<style lang="scss" scoped>
	.not-work {
		background: -webkit-linear-gradient(
			to right,
			#eb3349,
			#f45c43
		) !important; /* Chrome 10-25, Safari 5.1-6 */
		background: linear-gradient(to right, #eb3349, #f45c43) !important;
	}
	.df {
		background-color: rgb(202, 195, 182) !important;
	}
	.tardanzas {
		background: transparent;
		border: 2px solid white;
	}
	.card-day,
	.card-day-r {
		width: 100%;
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: repeat(4, min-content);
		align-items: center;
		justify-content: center;
		background-color: white;
		border-radius: 10px;
		gap: 0;
		.day-color {
			color: $text-color;
			font-size: 0.85rem;
			font-weight: 600;
			height: min-content;
		}
		.clock {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-around;
			width: 100%;
			padding-right: 1vh;
			span {
				font-size: 0.68rem;
				color: $text-color-light;
				font-weight: 500;
			}
		}
		.content {
			display: flex;
			flex-wrap: wrap;
			justify-content: center;
			.pp {
				span {
					background-color: rgb(235, 216, 181) !important;
				}
			}
		}
		.tardanza {
			padding-top: 1vh;
			padding-bottom: 1vh;
			span {
				color: rgba(224, 20, 20, 0.637);
				font-weight: 600;
				font-size: 1.2rem;
			}
		}
		.docs-range {
			.dr {
				span {
					background-color: orange !important;
				}
			}
		}
	}
	.card-day-r {
		background-color: rgb(214, 195, 231);
		height: 100%;
		.docs-range {
			height: max-content;
		}
	}
</style>

<style lang="scss" scoped>
	// .card-day,
	// .card-day-r,
	// .tardanzas,
	// .dm .df {
	// 	display: flex;
	// 	flex-direction: column;
	// 	justify-content: space-between;
	// 	align-items: center;
	// 	padding-bottom: 1vh;
	// 	height: 100%;
	// 	min-height: 7.5vh;
	// 	width: 100%;
	// }
	// .tardanzas {
	// 	background-color: rgb(243, 224, 190) !important;
	// }
	// .df {
	// 	// background-image: url('../../../assets/sleeping.png');
	// 	background-repeat: no-repeat;
	// 	background-attachment: local;
	// 	background-position: center top;
	// 	background-size: contain;
	// 	background-color: rgba(247, 246, 226, 0.99) !important;
	// 	.day-color {
	// 		font-weight: 600;
	// 	}
	// }
	// .dm {
	// 	background-image: url('../../../assets/doctor.png');
	// 	background-repeat: no-repeat;
	// 	background-attachment: local;
	// 	background-position: center top;
	// 	background-size: contain;
	// 	background-color: rgba(27, 27, 27, 0.99) !important;
	// 	.day-color {
	// 		color: white;
	// 		font-weight: 600;
	// 	}
	// }
	// .not-work {
	// 	background-color: rgba(243, 28, 0, 0.651) !important;
	// 	border: 1.5px solid white;
	// }
	// .card-day-r {
	// 	height: 100%;
	// 	gap: 0;
	// 	border-radius: 15px;
	// 	opacity: 0.9;
	// }
	// .card-day {
	// 	border-radius: 10px;
	// 	gap: 1vh;
	// 	background-color: white;

	// 	h3 {
	// 		font-size: 1rem;
	// 		font-weight: 500;
	// 	}
	// 	.clock {
	// 		width: 100%;
	// 		display: flex;
	// 		flex-direction: row;
	// 		flex-wrap: wrap;
	// 		justify-content: space-around;
	// 		align-items: center;
	// 		span {
	// 			font-size: 0.75rem;
	// 		}
	// 	}
	// 	.tardanza {
	// 		span {
	// 			font-size: 1.4rem;
	// 			font-weight: 700;
	// 			color: gray;
	// 		}
	// 	}
	// 	.content {
	// 		display: flex;
	// 		gap: 2px;
	// 		flex-wrap: wrap;
	// 		justify-content: center;
	// 		align-items: center;
	// 		width: 100%;

	// 		button {
	// 			font-size: 0.6rem;
	// 			padding: 0;
	// 			min-width: 5vh;
	// 		}
	// 		.pp,
	// 		.dd,
	// 		.dr {
	// 			border: none;
	// 			outline: none;
	// 		}
	// 		.pp {
	// 			background-color: bisque;
	// 		}
	// 		.dd {
	// 			background-color: aqua;
	// 		}
	// 		.dr {
	// 			background-color: orange;
	// 			opacity: 0.7;
	// 		}
	// 	}
	// }
</style>

<style lang="css">
	.popover {
		background: rgba(246, 247, 251, 0.28);
		border-radius: 16px;
		box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
		backdrop-filter: blur(14px);
		-webkit-backdrop-filter: blur(14px);
		border: none;
		margin: 0 !important;
		width: max-content;
		padding: 0 !important;
	}
	.popover > .popover-body {
		padding: 5px;
	}
	.pp-container {
		display: flex;
		font-family: 'Nunito', sans-serif;
		height: min-content;
		width: min-content;
		padding: 0;
		margin: 0;
		gap: 2vh;
	}
	.pp-container > .ppv-card {
		display: flex;
		flex-wrap: wrap;
		gap: 5px;
		justify-content: center;
	}
	.pp-container > .ppv-card > span {
		font-weight: 600;
		opacity: 0.5;
	}
	.pp-container > .ppv-card > .permiso {
		background-color: orange;
		border-radius: 15px;
		padding: 0 12px 0 12px;
		color: #5549a6;
		font-weight: 700;
		opacity: 1;
	}
	.pp-container > .ppv-card > .nombre {
		padding: 0 12px 0 12px;
		color: #5549a6;
		font-weight: 700;
		opacity: 1;
	}
	.pp-container > .ppv-card > .ref {
		padding: 0 12px 0 12px;
		color: #5549a6;
		font-weight: 700;
		opacity: 0.5;
	}
</style>
