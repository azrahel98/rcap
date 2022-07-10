<template>
	<div class="card">
		<h3>{{ propr.dni }}</h3>
		<p class="title is-5">{{ propr.nombre }}</p>
		<div class="icons">
			<button class="button papeleta" @click="openmemo(true)" v-if="user.admin">
				<span class="icon is-small">
					<i class="fa-solid fa-file-circle-plus"></i>
				</span>
			</button>
			<button class="button memo" @click="openmemo(false)" v-if="user.admin">
				<span class="icon is-small">
					<i class="fa-solid fa-file-lines"></i>
				</span>
			</button>
			<button class="button" @click="getEmploy">
				<span class="icon is-small">
					<i class="fa-solid fa-share"></i>
				</span>
			</button>
		</div>
	</div>
	<Teleport to="#resultado" v-if="showp">
		<Modal
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
		/>
	</Teleport>
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
		max-width: 19vh;
		background-color: $primary;
		border-radius: 10.9322px;
		display: grid;
		grid-template-rows: 3vh auto auto;
		justify-content: center;
		padding-top: 1vh;
		padding-bottom: 1vh;

		h3 {
			min-height: 4vh;
		}
		p {
			word-wrap: break-word;
			height: 100%;
			color: $bsidebar;
		}
		.icons {
			display: flex;
			justify-content: space-evenly;
			.papeleta {
				color: $alternative;
			}
			.memo {
				color: $secundary;
			}
			.button {
				border: none;
				height: 4vh;
			}
		}
	}
</style>
