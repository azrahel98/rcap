<template>
	<div class="card">
		<h3>{{ propr.dni }}</h3>
		<p class="title is-5">{{ propr.nombre }}</p>
		<div class="icons">
			<button class="button" @click="() => (showmodal = true)">
				<span class="icon is-small">
					<i class="fa-solid fa-file-circle-plus"></i>
				</span>
			</button>
			<button class="button" @click="() => (showmodal = true)">
				<span class="icon is-small">
					<i class="fa-solid fa-file-lines"></i>
				</span>
			</button>
		</div>
	</div>
	<Teleport to="#resultado" v-if="showmodal">
		<Modal
			@change="close"
			:cargo="propr.cargo"
			:dni="propr.dni"
			:nombre="propr.nombre"
		>
			<h2>Hola</h2>
		</Modal>
	</Teleport>
</template>

<script lang="ts" setup>
	import Modal from './modal.vue'
	import { ref } from 'vue'

	const propr = defineProps({
		nombre: { required: true, type: String },
		dni: { required: true, type: String },
		cargo: { required: true, type: String },
	})

	const showmodal = ref(false)
	const close = (e) => (showmodal.value = e)
	const out = (e) => {
		console.log(e)
	}
</script>

<style lang="scss" scoped>
	.card {
		max-width: 19vh;
		min-height: 15vh;
		max-height: 20vh;
		background-color: #f6f7fc;
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
			text-align: center;
			word-wrap: break-word;
			height: 100%;
		}
		.icons {
			display: flex;
			justify-content: space-evenly;

			.button {
				height: 4vh;
			}
		}
	}
</style>
