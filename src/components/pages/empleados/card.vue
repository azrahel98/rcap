<template>
	<div class="card">
		<div class="cname">
			<div class="avatar" :data-label="AbrevName()" />
			<div class="ofname">
				<router-link :to="`/asistencia/${propr.dni}`" class="link" tag="a"
					><h3>{{ propr.nombre }}</h3></router-link
				>
				<p>{{ propr.dni }}</p>
			</div>
		</div>
		<div class="cdet">
			<div class="icons" v-if="propr.ingreso !== '0000-00-00'">
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

	function AbrevName(): string {
		let rgx = new RegExp(/(\p{L}{1})\p{L}+/, 'gu')

		let initials = [...propr.nombre.matchAll(rgx)] || []

		return (
			(initials.shift()?.[1] || '') + (initials.pop()?.[1] || '')
		).toUpperCase()
	}
</script>

<style lang="scss" scoped>
	textarea,
	input {
		font-family: 'Ubuntu Mono', sans-serif;
	}
	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
	.card {
		border-radius: 10.9322px;
		display: grid;
		grid-template-rows: auto 1fr auto;
		grid-template-columns: 1fr;
		width: min-content;
		min-width: 20vh;
		row-gap: 2vh;
		height: min-content;
		.cname {
			padding: 5px 10px 0 5px;
			display: grid;
			grid-template-columns: auto 1fr;
			grid-template-rows: auto;
			column-gap: 5px;
			.avatar {
				width: 50px;
				height: 50px;
				border-radius: 50%;
				background-color: $color-primary;
				display: inline-flex;
				align-items: center;
				justify-content: center;
			}
			::after {
				content: attr(data-label);
				color: $color-white;
				font-weight: 600;
			}
			.ofname {
				display: flex;
				flex-direction: column;
				justify-content: center;
				a {
					text-decoration: none;
					h3 {
						font-weight: 700;
						font-size: 0.8rem;
						color: $color-dark;
					}
				}

				p {
					font-size: 0.7rem;
					font-weight: 500;
				}
			}
		}
		.cdet {
			align-self: flex-start;
			justify-self: center;
			display: flex;
			flex-wrap: wrap;
			justify-content: flex-start;
			padding: 0 3px 0 8px;
			gap: 5px;
			.icons {
				display: flex;
				font-size: 0.6rem;
				gap: 0.9vh;
				p {
					font-weight: 500;
					// font-size: 0.8rem;
				}
				span {
					color: $color-primary;
					font-size: 1rem;
				}
			}
		}
		.icons-a {
			display: flex;
			align-items: center;
			.p {
				background-color: $opaque;
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
				color: $color-white;
				padding: 0.5rem;
				span {
					// background-color: red;
					font-size: 1rem;
				}
			}
		}
	}
</style>
