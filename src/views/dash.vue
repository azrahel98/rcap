<template>
	<div class="maindash">
		<div class="dash">
			<Sideb></Sideb>
			<div class="main" id="main">
				<router-view />
			</div>
			<div class="rigth">
				<div class="top">
					<button id="menu-btn" v-on:click="open">
						<span class="material-icons">menu</span>
					</button>
					<div class="theme-toggler">
						<span class="material-icons active">light_mode</span>
						<span class="material-icons">dark_mode</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script lang="ts" setup>
	import { onMounted, ref } from 'vue'
	import { userStore } from '@store/user'
	import Sideb from '@com/side.vue'
	const user = userStore()
	onMounted(() => {
		user.InitAdmin()
	})

	const open = () => {
		document.querySelector('aside').classList.toggle('open')
	}
</script>
<style lang="scss" scoped>
	.open {
		display: block;
	}
	.maindash {
		width: 100vw;
		height: 100vh;
		font-family: poppins, sans-serif;
		font-size: 0.88rem;
		background-color: $color-background;
		overflow: hidden;
		.dash {
			display: grid;
			margin: 0 auto;
			grid-template-columns: 9rem auto 8vh;
			.main {
				width: 100%;
				display: flex;
				justify-content: space-between;
				border-left: 5px solid $color-light;
				margin-left: 2px;
				padding-top: 4vh;
			}
			.rigth {
				margin-top: 1.4rem;
				.top {
					display: flex;
					width: 100%;
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
				}
			}
			@media screen and (max-width: 1200px) {
				width: 100%;
				grid-template-columns: 7rem auto 6vh;
			}
			@media screen and (max-width: 768px) {
				width: 100%;
				grid-template-columns: 100%;
				.main {
					margin-top: 3.8rem;
					padding: 0;
				}
				.rigth {
					width: 100%;
					margin: 0 auto 4rem;

					.top {
						position: fixed;
						top: 0;
						left: 0;
						display: flex;
						align-items: center;
						justify-content: space-between;
						height: 3rem;
						width: 100%;
						padding-right: 2vh;
						padding-left: 2vh;
						box-shadow: 0 0.1rem 0.5rem $color-light;

						button {
							display: inline-block;
							background: transparent;
							cursor: pointer;
							color: $color-dark;
							left: 1rem;
							span {
								font-size: 2rem;
							}
						}
					}
				}
			}
		}
	}
</style>
