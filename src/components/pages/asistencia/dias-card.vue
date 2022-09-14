<template>
	<div class="d-card">
		<div class="d-day">
			<h5>{{ prop.day }}</h5>
			<div class="d-reloj">
				<span v-for="x in asis">{{ x['marca'] }}</span>
			</div>
		</div>
		<div class="d-body">
			<div class="pp">
				<div class="list-p" v-for="(d, e) in prop.papeletas">
					<button
						class="badge rounded-pill"
						:id="`ppver-pp-${d['nombre']}`"
						:style="{
							backgroundColor: AbrevPermisoP(d['tipoP'])[1] + '!important',
						}"
					>
						{{ AbrevPermisoP(d['tipoP'])[0] }}
					</button>
					<b-popover
						:target="`ppver-pp-${d['nombre']}`"
						triggers="focus"
						placement="top"
					>
						<div class="po-p">
							<div class="ppn">
								<span>{{ d['nombre'] }}</span>
								<p>{{ d['fecha'] }}</p>
							</div>
							<div class="ppbdy">
								<p>{{ d['descrip'] }}</p>
							</div>
							<div class="ppft">
								<span>{{ d['detalle'] }}</span>
							</div>
						</div>
					</b-popover>
				</div>
			</div>
			<div class="mm">
				<div class="list-p" v-for="(d, e) in prop.docs">
					<button
						class="badge rounded-pill"
						:id="`ppver-dd-${d['id']}`"
						:style="{
							backgroundColor: AbrevPermisoP(d['permiso'])[1] + '!important',
						}"
					>
						{{ AbrevPermisoP(d['permiso'])[0] }}
					</button>
					<b-popover
						:target="`ppver-dd-${d['id']}`"
						triggers="focus"
						placement="top"
					>
						<div class="po-p">
							<div class="ppn">
								<span>{{ d['doc'] }}</span>
								<span>{{ d['tipo'] }}</span>
							</div>
							<div class="ppbdy">
								<p>{{ d['descrip'] }}</p>
							</div>
							<div class="ppft">
								<p>{{ d['fecha'] }}</p>
							</div>
						</div>
					</b-popover>
				</div>
			</div>
			<div class="rng">
				<div class="list-p" v-for="(d, e) in prop.rangd">
					<button
						class="badge rounded-pill"
						:id="`ppver-ddr-${d['id']}-${prop.day}`"
						:style="{
							backgroundColor: AbrevPermisoP(d['permiso'])[1] + '!important',
						}"
					>
						{{ AbrevPermisoP(d['permiso'])[0] }}
					</button>
					<b-popover
						:target="`ppver-ddr-${d['id']}-${prop.day}`"
						triggers="focus"
						placement="top"
					>
						<div class="po-p">
							<div class="ppn">
								<span>{{ d['doc'] }}</span>
								<span>{{ d['tipo'] }}</span>
							</div>
							<div class="ppbdy">
								<p>{{ d['descrip'] }}</p>
							</div>
							<div class="ppft">
								<p>{{ d['fecha'] }}</p>
							</div>
						</div>
					</b-popover>
				</div>
			</div>
		</div>
	</div>
</template>
<script lang="ts" setup>
	import { ref } from 'vue'
	import { BPopover } from 'bootstrap-vue-3'
	import { AbrevPermisoP } from '../../../tools/calendar'
	const prop = defineProps({
		day: { type: Number, required: true },
		list: { required: false },
		papeletas: { required: false, type: Array },
		docs: { required: false },
		rangd: { required: false, type: Array },
	})
	const asis = ref<any>()

	asis.value = (prop.list as Array<any>).sort(
		(a, b) =>
			((a['marca'].split(':')[0] as number) -
				b['marca'].split(':')[0]) as number
	)
</script>
<style lang="scss" scoped>
	.d-card {
		border-radius: 10px;
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: 1fr auto-fill auto-fill;
		height: 100%;
		background-color: $color-white;
		.d-day {
			display: flex;
			justify-content: center;
			align-items: center;
			flex-wrap: wrap;
			height: min-content;
			h5 {
				width: 60%;
				color: $color-dark;
				font-size: 1rem;
				font-weight: 500;
				text-align: center;
			}
			.d-reloj {
				width: min-content;
				display: flex;
				justify-content: space-around;
				gap: 1vh;
				flex-wrap: wrap;
				color: gray;
				height: min-content;
				width: min-content-;
				span {
					font-weight: 500;
				}
			}
		}

		.d-body {
			.list-p {
				button {
					padding: 0.5vh;
					font-size: 0.7rem !important;
					font-weight: 600;
				}
			}
			.pp,
			.mm,
			.rng {
				display: flex;
				width: 100%;
				flex-wrap: wrap;
				justify-content: center;
				gap: 1vh;
			}
			.mm {
				.list-p {
					button {
						color: $color-info-light;
						font-weight: 700;
						opacity: 0.6;
					}
				}
			}
		}
	}
	.po-p {
		min-width: 20px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		.ppn {
			display: flex;
			gap: 2vh;
			flex-wrap: wrap;
			justify-content: center;
			align-items: center;
		}
	}
</style>

<style lang="scss">
	.popover-header {
		display: none;
	}
	.popover {
		background: $color-info-light;
		backdrop-filter: blur(05px);
		border: none;
	}
</style>
