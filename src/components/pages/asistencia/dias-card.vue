<template>
	<div class="d-card">
		<div class="d-day">
			<h5>{{ prop.day }}</h5>
			<div class="d-reloj">
				<span v-for="x in prop.list">{{ x['marca'] }}</span>
			</div>
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

	<!-- <div class="d-card">
		<div class="day-info">
			<div class="dia">
				<h1>{{ prop.day }}</h1>
			</div>
			<div class="d-marca">
				<h6 v-for="x in prop.list">
					{{ x['marca'] }}
				</h6>
			</div>
		</div>

		<div class="d-docs" v-if="prop.rangd.length == 0">
			<div class="d-p">
				<div v-for="x in papeletas">
					<span
						class="badge position-relative papeleta-bg"
						v-on:click="() => (show = true)"
						data-bs-toggle="modal"
						:data-bs-target="`#p${x['nombre']}`"
					>
						{{ x['nombre'] }}
						<span
							class="position-absolute top-0 start-100 translate-middle badge rounded-pill"
							v-bind:style="{ backgroundColor: AbrevPermisoP(x['tipoP'])[1] }"
						>
							{{ x['tipoP'] }}
						</span>
					</span>

					<Teleport to="body" v-if="show">
						<ModalP
							:dni="`${x['nombre']}`"
							:nombre="x['nombre']"
							:papeleta="x"
						/>
					</Teleport>
				</div>
			</div>
			<div class="d-doc">
				<div v-for="x in docs">
					<span
						class="badge bg-light text-dark text-wrap"
						v-on:click="() => (show = true)"
						data-bs-toggle="modal"
						:data-bs-target="`#m${x['id']}`"
					>
						{{ AbrevPermisoP(x['doc'])[0] }}
					</span>
					<Modal :id="`m${x['id']}`">
						<div class="m-cont">
							<div class="m-top">
								<p>{{ x['tipo'] }}</p>
								<h6>{{ x['doc'] }}</h6>
							</div>
							<div class="m-descr">
								<p>{{ x['descrip'] }}</p>
								<div>
									<span>{{ x['fecha'] }}</span>
									<h5>{{ x['permiso'] }}</h5>
								</div>
							</div>
							<div class="rango">
								<span>{{ x['Inicio'] }}</span>
								<span>{{ x['Fin'] }}</span>
							</div>
						</div>
					</Modal>
				</div>
			</div>
		</div>
		<div class="d-docs" v-else>
			<div class="d-p">
				<div v-for="x in papeletas">
					<span
						class="badge position-relative papeleta-bg"
						v-on:click="() => (show = true)"
						data-bs-toggle="modal"
						:data-bs-target="`#p${x['nombre']}`"
					>
						{{ AbrevPermisoP(x['doc'])[0] }}
						<span
							class="position-absolute top-0 start-100 translate-middle badge rounded-pill"
							v-bind:style="{ backgroundColor: AbrevPermisoP(x['tipoP'])[1] }"
						>
							{{ AbrevPermisoP(x['tipoP'])[0] }}
						</span>
					</span>

					<Teleport to="body" v-if="show">
						<ModalP
							:dni="`${x['nombre']}`"
							:nombre="x['nombre']"
							:papeleta="x"
						/>
					</Teleport>
				</div>
			</div>
			<div class="d-doc">
				<div v-for="x in rangd">
					<span
						class="badge bg-light range text-wrap"
						v-on:click="() => (show = true)"
						:class="x['permiso'] == 'DF' ? 'bg-df' : 'bg-jut'"
						data-bs-toggle="modal"
						:data-bs-target="`#m${prop.day}`"
					>
						{{ x['permiso'] }}
					</span>
					<Modal :id="`m${prop.day}`">
						<div class="m-cont">
							<div class="m-top">
								<p>{{ x['tipo'] }}</p>
								<h6>{{ x['doc'] }}</h6>
							</div>
							<div class="m-descr">
								<p>{{ x['descrip'] }}</p>
								<div>
									<span>{{ x['fecha'] }}</span>
									<h5>{{ x['permiso'] }}</h5>
								</div>
							</div>
							<div class="rango">
								<span>{{ x['Inicio'] }}</span>
								<span>{{ x['Fin'] }}</span>
							</div>
						</div>
					</Modal>
				</div>
			</div>
		</div>
		<div class="add-days">
			<div class="tiempos" v-if="prop.rangd.length == 0">
				<button>2</button>
				<button>5</button>
				<button>F</button>
			</div>
			<button>
				<span class="material-icons"> add_circle </span>
			</button>
		</div>
	</div> -->
</template>
<script lang="ts" setup>
	import { AbrevPermisoP } from '../../../tools/calendar'
	import { BPopover } from 'bootstrap-vue-3'

	const prop = defineProps({
		day: { type: Number, required: true },
		list: { required: false },
		papeletas: { required: false, type: Array },
		docs: { required: false },
		rangd: { required: false, type: Array },
	})
</script>
<style lang="scss" scoped>
	.d-card {
		border: 0.01rem solid #cbcee1;
		border-radius: 10px;
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: 1fr 1fr;
		.d-day {
			padding-top: 2px;
			display: flex;
			flex-wrap: wrap;
			justify-content: space-evenly;
			.d-reloj {
				display: flex;
				flex-direction: column;
				flex-wrap: wrap;
				color: gray;
				span {
					font-weight: 600;
				}
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
				span {
					height: max-content;
					box-shadow: none;
					cursor: pointer;
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
