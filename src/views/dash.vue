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
					<div class="profile">
						<div class="info">
							<p>Hola <b>Raul</b></p>
							<small>Admin</small>
						</div>
						<div class="profile-potho">
							<img src="" alt="" />
						</div>
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
			gap: 1.8rem;
			grid-template-columns: 9rem auto auto;
			@media screen and (max-width: 1200px) {
				width: 94%;
				grid-template-columns: 7rem auto 23rem;
			}
			@media screen and (max-width: 768px) {
				width: 100%;
				grid-template-columns: 1fr;
				.main {
					margin-top: 8rem;
					padding: 0 1rem;
				}
				.rigth {
					width: 94%;
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
						.theme-toggler {
							width: 4.4rem;
							position: absolute;
							left: 66%;
						}
						.profile {
							.info {
								display: none;
							}
						}
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
			.main {
				width: 100%;
				display: flex;
				justify-content: space-between;
			}
		}
		.rigth {
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
