<template>
	<div class="card">
		<div class="cname">
			<div class="avatar" :data-label="AbrevName()" />
			<div class="ofname">
				<router-link
					:to="`/asistencia/${propr.dni}`"
					class="link"
					tag="a"
					@click="addEmploySide"
					><h3>{{ propr.nombre }}</h3></router-link
				>
				<p>{{ propr.dni }}</p>
			</div>
		</div>
		<div class="cdet">
			<div class="icons" v-if="(propr.employ as Employ).ingreso !== null">
				<span class="material-icons"> insert_invitation </span>
				<p>
					{{ moment((propr.employ as Employ).ingreso).format('YYYY-MM-DD') }}
				</p>
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
		<ModalP :dni="propr.dni" />
	</div>
</template>

<script lang="ts" setup>
	import { ref } from 'vue'
	import { EmployStore } from '@store/employ'
	import { Employ } from '@/model/employs'
	import moment from 'moment'
	import ModalP from '@com/modal/pp.vue'

	const isMemo = ref<any>(false)
	const emplostore = EmployStore()
	const propr = defineProps({
		employ: { required: true, type: Object },
		nombre: { required: true, type: String },
		dni: { required: true, type: String },
		area: { required: true, type: String },
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
	function addEmploySide() {
		emplostore.addEmploy({ nombre: propr.nombre, dni: propr.dni })
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
				background-color: #7380ec;
				display: inline-flex;
				align-items: center;
				justify-content: center;
			}
			::after {
				content: attr(data-label);
				color: white;
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
						color: gray;
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
					// font-size: 0.7rem;
					color: $text-color;
				}
				span {
					color: #0d6efd;
					font-size: 1rem;
				}
			}
		}
		.icons-a {
			display: flex;
			align-items: center;
			.p {
				background-color: gray;
				border-bottom-left-radius: 10.9322px;
			}
			.m {
				background-color: #7380ec;
				border-bottom-right-radius: 10.9322px;
			}
			button {
				width: 100%;
				border-radius: 0;
				outline: none;
				border: none;
				color: white;
				padding: 0.5rem;
				span {
					// background-color: red;
					font-size: 1rem;
				}
			}
		}
	}
</style>
