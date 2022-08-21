<template>
	<div class="card">
		<div class="cname">
			<router-link :to="`/asistencia/${propr.dni}`" class="link" tag="a"
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
				class="btn p"
				data-bs-toggle="modal"
				:data-bs-target="`#p${propr.dni}`"
				v-on:click="change(false)"
			>
				<span class="material-icons"> receipt_long </span>
			</button>
			<button
				class="btn m"
				data-bs-toggle="modal"
				:data-bs-target="`#m${propr.dni}`"
				v-on:click="change(true)"
			>
				<span class="material-icons"> description </span>
			</button>
		</div>
	</div>

	<Modal :cargo="propr.cargo" :dni="propr.dni" :nombre="propr.nombre" />
	<ModalM :cargo="propr.cargo" :dni="propr.dni" :nombre="propr.nombre" />
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
		border-radius: 10.9322px;
		display: grid;
		grid-template-rows: auto 1fr auto;
		grid-template-columns: 1fr;
		row-gap: 1vh;
		width: min-content;
		min-width: 18vh;
		.cname {
			padding-top: 1.5vh;
			justify-self: center;
			align-self: flex-start;
			padding-left: 1vh;
			padding-right: 1vh;
			a {
				:hover {
					color: $alternative;
				}
				h3 {
					font-weight: 600;
					font-size: 1.5rem;
				}
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
			.link {
				text-decoration: none;
			}
		}
		.cdet {
			align-self: flex-start;
			justify-self: center;
			display: flex;
			flex-wrap: wrap;
			justify-content: center;
			.icons {
				display: flex;
				font-size: 0.7rem;
				gap: 0.3vh;
				p {
					font-weight: 500;
					// font-size: 0.8rem;
				}
				span {
					color: $color-primary;
				}
			}
		}
		.icons-a {
			display: flex;
			align-items: center;

			.p {
				background-color: $color-info-dark;
				border-bottom-left-radius: 10.9322px;
			}
			.m {
				background-color: $color-primary;
				border-bottom-right-radius: 10.9322px;
			}
			button {
				width: 100%;
				border-radius: 0;
				outline: none;
				border: none;
			}
		}
	}
</style>
