<template>
	<div class="card">
		<div class="cname">
			<h3>{{ propr.nombre }}</h3>
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
		<!-- <h3>{{ propr.dni }}</h3>
		<p class="subtitle is-6">{{ propr.nombre }}</p> -->
		<!-- <div class="icons">
			<button
				type="button"
				class="btn btn-primary"
				data-toggle="modal"
				:data-target="`#${propr.dni}`"
			>
				Launch demo modal
			</button>

			<button class="button" @click="getEmploy">
				<span class="icon is-small">
					<i class="fa-solid fa-share"></i>
				</span>
			</button>
		</div> -->
	</div>

	<!-- <Modal
		@change="close"
		:cargo="propr.cargo"
		:dni="propr.dni"
		:nombre="propr.nombre"
		v-if="ispape"
	/>
	<ModalM
		@change="close"
		:cargo="propr.cargo"
		:dni="propr.dni"
		:nombre="propr.nombre"
		v-else
	/> -->
</template>

<script lang="ts" setup>
	import Modal from './modal.vue'
	import { ref } from 'vue'
	import ModalM from './modal-m.vue'
	import router from '../../../router/router'
	import { userStore } from '@store/user'

	const user = userStore()

	const propr = defineProps({
		nombre: { required: true, type: String },
		dni: { required: true, type: String },
		area: { required: true, type: String },
		ingreso: { required: true, type: String },
		cargo: { required: true, type: String },
	})

	const getEmploy = async () => {
		await router.push(`/asistencia/${propr.dni}`)
	}

	const showp = ref(false)
	const ispape = ref(true)
	const close = (e) => (showp.value = e)
	const openmemo = (memo: boolean) => {
		ispape.value = memo
		showp.value = true
	}
</script>

<style lang="scss" scoped>
	.card {
		min-height: 48vh;
		max-height: 55vh;
		width: 30vh;
		background-color: $opaque;
		border-radius: 10.9322px;
		display: grid;
		grid-template-rows: auto 1fr;
		justify-content: center;
		align-items: center;
		.cname {
			padding-top: 1.5vh;
			padding-left: 1vh;
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
			height: 100%;
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
	}
	// 	h3 {
	// 		min-height: 4vh;
	// 		color: $secundary;
	// 		font-size: 0.85rem;
	// 		font-weight: 500;
	// 	}
	// 	p {
	// 		word-wrap: break-word;
	// 		height: 100%;
	// 		font-weight: 500;
	// 		color: $bsidebar;
	// 	}
	// 	.icons {
	// 		display: flex;
	// 		justify-content: space-evenly;
	// 		.papeleta {
	// 			color: $alternative;
	// 		}
	// 		.memo {
	// 			color: $secundary;
	// 		}
	// 		.button {
	// 			border: none;
	// 			height: 4vh;
	// 		}
	// 	}
	// }
</style>
