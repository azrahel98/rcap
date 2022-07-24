<template>
	<div class="card">
		<div class="cname">
			<router-link :to="`/asistencia/${propr.dni}`"
				><h3>{{ propr.nombre }}</h3></router-link
			>
			<p>{{ propr.dni }}</p>
		</div>
		<div class="cdet">
			<div class="icons">
				<span class="material-icons"> insert_invitation </span>
				<p>{{ propr.ingreso }}</p>
			</div>
			<div class="icons">
				<span class="material-icons"> business </span>
				<p>{{ propr.area }}</p>
			</div>
			<div class="icons">
				<span class="material-icons"> work </span>
				<p>{{ propr.cargo }}</p>
			</div>
		</div>

		<div class="icons-a">
			<button
				class="btn"
				data-toggle="modal"
				:data-target="`#p${propr.dni}`"
				v-on:click="change(false)"
			>
				<span class="material-icons"> receipt_long </span>
			</button>
			<button
				class="btn"
				data-toggle="modal"
				:data-target="`#m${propr.dni}`"
				v-on:click="change(true)"
			>
				<span class="material-icons"> description </span>
			</button>
		</div>
	</div>

	<Modal
		:cargo="propr.cargo"
		:dni="propr.dni"
		:nombre="propr.nombre"
		v-if="!isMemo"
	/>
	<ModalM :cargo="propr.cargo" :dni="propr.dni" :nombre="propr.nombre" v-else />
</template>

<script lang="ts" setup>
	import Modal from './modal.vue'
	import ModalM from './modal-m.vue'
	import { ref } from 'vue'

	const isMemo = ref<any>(false)

	const propr = defineProps({
		nombre: { required: true, type: String },
		dni: { required: true, type: String },
		area: { required: true, type: String },
		ingreso: { required: true, type: String },
		cargo: { required: true, type: String },
	})
	const change = (x) => {
		isMemo.value = x
	}
</script>

<style lang="scss" scoped>
	.card {
		background-color: $opaque;
		border-radius: 10.9322px;
		display: grid;
		grid-template-rows: auto 1fr 5vh;
		max-width: 25vh;
		min-width: 20vh;
		.cname {
			padding-top: 1.5vh;
			justify-self: center;
			align-self: flex-start;
			padding-right: 2vh;
			h3 {
				font-weight: 600;
				font-size: 1.5rem;
			}
			p {
				font-size: 0.8rem;
				font-weight: 500;
			}
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: space-around;
			color: white;
		}
		.cdet {
			align-self: flex-start;
			justify-self: start;
			display: flex;
			flex-direction: column;
			justify-content: center;
			gap: 0.2vh;
			align-items: flex-start;
			.icons {
				color: $alternative;
				display: flex;
				font-size: 0.7rem;
				gap: 1vh;
				p {
					font-weight: 500;
					// font-size: 0.8rem;
				}
			}
		}
		.icons-a {
			display: flex;
			flex-wrap: wrap;
			align-items: center;
			justify-content: space-around;
			padding-bottom: 1vh;
			button {
				text-align: center;
			}
		}
	}
</style>
