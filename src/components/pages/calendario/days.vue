<template>
	<div
		:class="[
			prop.docr.length !== 0 ? 'card-day-r' : 'card-day',
			prop.marc.length == 0 && prop.docr.length == 0 ? 'not-work' : '',
		]"
	>
		<div>
			<button
				class="btn btn-primary"
				data-bs-toggle="modal"
				:data-bs-target="`#modal${i}`"
			>
				{{ prop.i }}
			</button>
			<div
				class="modal fade"
				role="dialog"
				:id="`modal${i}`"
				tabindex="-1"
				aria-hidden="true"
			>
				<div class="modal-dialog">
					<div class="modal-content">
						<h1>asdf</h1>
					</div>
				</div>
			</div>
		</div>
		<div class="clock">
			<span v-for="i in prop.marc">{{ i['hora'].substring(0, 5) }}</span>
		</div>
		<div class="content">
			<div v-if="prop.pps.length !== 0">
				<button type="button" class="btn pp" :id="`ppver-pp-${i + 1}`">
					PP
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
			<div>
				<button
					type="button"
					class="btn dd"
					:id="`ppver-dc-${i + 1}`"
					v-if="
						docs.length !== 0 &&
						docs.filter((e) => moment(e['fecha']).month() + 1 == currentMonth)
					"
				>
					DC
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
			<button
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
			</button>
		</div>
	</div>
</template>

<script lang="ts" setup>
	import { PP } from '../../../../app/model/doc/pp'
	import moment from 'moment'

	const prop = defineProps({
		i: { type: Number, required: true },
		marc: { type: Array, required: true },
		pps: { type: Array, required: true },
		docs: { type: Array, required: true },
		docr: { type: Array, required: true },
		currentMonth: { type: Number, required: true },
	})
</script>

<style lang="scss" scoped>
	.card-day,
	.card-day-r {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		padding-bottom: 1vh;
		height: 100%;
		min-height: 7.5vh;
		width: 100%;
	}
	.not-work {
		background: rgba(255, 255, 255, 0);
		opacity: 0.6;
		border: 1.5px solid white;
	}
	.card-day-r {
		background-color: #fae3a2;
		height: 100%;
		gap: 0;
		border-radius: 15px;
		opacity: 0.7;
	}
	.card-day {
		border-radius: 10px;
		gap: 1vh;
		background-color: white;
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
			.pp,
			.dd,
			.dr {
				border: none;
				outline: none;
			}
			.pp {
				background-color: bisque;
			}
			.dd {
				background-color: aqua;
			}
			.dr {
				background-color: orange;
				width: 100%;
			}
		}
	}
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
