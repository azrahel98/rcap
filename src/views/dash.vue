<template>
	<div class="dash">
		<Sideb :show="showMenu" @close="(e) => (showMenu = e)"></Sideb>
		<div class="main" id="main">
			<router-view />
		</div>
		<div class="rigth">
			<div class="top">
				<button v-on:click="change(true)">
					<span class="material-icons">menu</span>
				</button>
				<div class="logo">
					<h2>MVS<span class="danger">LM</span></h2>
				</div>
			</div>
		</div>
	</div>
</template>
<script lang="ts" setup>
	import { onMounted, ref, watchEffect } from 'vue'
	import { userStore } from '@store/user'
	import Sideb from '@com/side.vue'
	import { useScreen } from 'vue-screen'

	const user = userStore()
	onMounted(() => {
		user.InitAdmin()
	})

	const showMenu = ref<any>(true)

	const change = (x: boolean) => {
		showMenu.value = x
	}
	watchEffect(() => {
		if (useScreen().width >= 768) {
			showMenu.value = true
		}
	})
</script>
<style lang="scss" scoped>
	body {
		width: 100% !important;
		height: 100vh;
		font-family: poppins, sans-serif;
		font-size: 0.88rem;
		background-color: $color-background;
		overflow: hidden;
		.dash {
			background-color: $color-background;
			display: grid;
			width: 100%;
			margin: 0 auto;
			gap: 1.8rem;
			grid-template-columns: 10rem auto 0;
			@media screen and (max-width: 1200px) {
				width: 98%;
				grid-template-columns: 5rem auto 0;
			}
			@media screen and (max-width: 768px) {
				width: 100%;
				grid-template-columns: 1fr;
				.main {
					margin-top: 5rem;
					padding: 0 1rem;
				}
				.rigth {
					display: block;
					margin: 0 auto 4rem;
					.top {
						position: fixed;
						top: 0;
						left: 0;
						align-items: center;
						padding: 0 0.8rem;
						height: 4.6rem;
						background-color: $color-white;
						width: 100%;
						margin: 0;
						z-index: 2;
						box-shadow: 0 1rem 1rem $color-light;

						button {
							display: inline-block;
							background: transparent;
							cursor: pointer;
							color: $color-dark;
							position: absolute;
							left: 1rem;
							span {
								font-size: 2rem;
							}
						}
					}
				}
			}
		}

		.rigth {
			display: none;
			margin-top: 1.4rem;
			.top {
				display: flex;
				justify-content: end;
				gap: 2rem;
				button {
					display: none;
				}
				.theme-toggler {
					background: $color-light;
					display: flex;
					justify-content: space-between;
					align-items: center;
					height: 1.6rem;
					width: 4.2rem;
					cursor: pointer;
					border-radius: $border-radius-1;
					span {
						font-size: 1.2rem;
						width: 50%;
						height: 100%;
						display: flex;
						align-items: center;
						justify-content: center;
					}
					.active {
						background: $color-primary;
						color: white;
						border-radius: $border-radius-1;
					}
				}

				.profile {
					display: flex;
					gap: 2rem;
					text-align: right;
				}
			}
		}
	}
</style>
