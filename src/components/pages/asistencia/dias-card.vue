<template>
	<div class="d-card">
		<div class="d-day">
			<h5>{{ prop.day }}</h5>
		</div>
		<div class="d-reloj">
			<span v-for="x in asis">{{ x['marca'] }}</span>
		</div>
		<div class="d-body">
			<div class="d-pp">
				<div v-for="p in prop.papeletas">
					<button
						class="badge rounded-pill bg-primary"
						:id="`popover-target-${p['nombre']}`"
						:style="{
							backgroundColor: AbrevPermisoP(p['tipoP'])[1] + '!important',
						}"
					>
						{{ AbrevPermisoP(p['tipoP'])[0] }}
					</button>
					<b-popover
						:target="`popover-target-${p['nombre']}`"
						triggers="focus"
						placement="top"
						class="poppover"
					>
						<div class="po-p">
							<div class="p-top">
								<h6>Papeleta #{{ p['nombre'] }}</h6>
								<span> {{ p['detalle'] }}</span>
							</div>
							<div class="p-bt">
								<p>{{ p['descrip'] }}</p>
							</div>
						</div>
					</b-popover>
				</div>
			</div>
			<div class="d-dd">
				<div v-for="d in prop.docs">
					<button
						class="badge rounded-pill bg-primary"
						:id="`popover-target-${d['id']}`"
						:style="{
							backgroundColor: AbrevPermisoP(d['permiso'])[1] + '!important',
						}"
					>
						{{ AbrevPermisoP(d['permiso'])[0] }}
					</button>
					<b-popover
						:target="`popover-target-${d['id']}`"
						triggers="focus"
						placement="top"
					>
						<div class="po-p">
							<div class="p-top">
								<h6>#{{ d['doc'] }}</h6>
								<span> {{ d['permiso'] }}</span>
							</div>
							<div class="p-bt">
								<p>{{ d['descrip'] }}</p>
							</div>
						</div>
					</b-popover>
				</div>
				<div v-if="prop.rangd.length > 0">
					<div v-for="r in prop.rangd">
						<button
							class="badge rounded-pill bg-primary"
							:id="`rpopover-${r['id']}${prop.day}`"
							:style="{
								backgroundColor: AbrevPermisoP(r['permiso'])[1] + '!important',
							}"
						>
							{{ AbrevPermisoP(r['permiso'])[0] }}
						</button>
						<b-popover
							:target="`rpopover-${r['id']}${prop.day}`"
							triggers="focus"
							placement="top"
						>
							<div class="po-p">
								<div class="p-top">
									<h6>#{{ r['doc'] }}</h6>
									<span> {{ r['permiso'] }}</span>
								</div>
								<div class="p-bt">
									<p>{{ r['descrip'] }}</p>
									<p>{{ r['Inicio'] }} hasta {{ r['Fin'] }}</p>
								</div>
							</div>
						</b-popover>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script lang="ts" setup>
	import { AbrevPermisoP } from '../../../tools/calendar'
	import { BPopover } from 'bootstrap-vue-3'
	import { ref } from 'vue'

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
		border: 0.01rem solid $color-info-dark;
		border-radius: 10px;
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: auto auto 1fr;
		.d-day {
			padding-top: 2px;
			display: flex;
			flex-wrap: wrap;
			justify-content: space-evenly;

			h5 {
				color: $color-dark;
			}
		}
		.d-reloj {
			display: flex;
			justify-content: space-around;
			flex-wrap: wrap;
			color: gray;
			span {
				font-weight: 600;
			}
		}
		.d-body {
			display: flex;
			flex-wrap: wrap;
			justify-content: center;
			align-items: center;
			gap: 2px;
			.d-pp {
				display: flex;
				flex-wrap: wrap;
				gap: 3px;
				span {
					height: max-content;
					box-shadow: none;
					cursor: pointer;
				}
			}
			.d-dd {
				display: flex;
				justify-content: space-around;
				flex-wrap: wrap;
				gap: 2vh;
				div {
					span {
						height: max-content;
						box-shadow: none;
						cursor: pointer;
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
	}
</style>

<style lang="scss">
	.popover-header {
		display: none;
	}
	.popover {
		background: rgba(255, 255, 255, 0.65);
		backdrop-filter: blur(10px);
	}
</style>
