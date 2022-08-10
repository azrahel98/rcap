<template>
	<aside v-show="prop.show">
		<div class="top">
			<div class="logo">
				<h2>MVS<span class="danger">LM</span></h2>
			</div>
			<div class="close" id="close-btn">
				<span class="material-icons" v-on:click="() => e('close', false)"
					>close</span
				>
			</div>
		</div>
		<div class="sidebar">
			<router-link to="/" exact-active-class="active" ref="a">
				<span class="material-icons">grid_view</span>
				<h3>Dashboard</h3>
			</router-link>
			<router-link to="/employees" exact-active-class="active" ref="a">
				<span class="material-icons">badge</span>
				<h3>Trabajadores</h3>
			</router-link>

			<a href="#">
				<span class="material-icons">logout</span>
				<h3>Logout</h3>
			</a>
		</div>
	</aside>
</template>

<script lang="ts" setup>
	const prop = defineProps({
		show: { required: true, type: Boolean },
	})
	const e = defineEmits(['close'])
</script>

<style lang="scss" scoped>
	aside {
		display: block;
		height: 100vh;
		width: max-content;
		background-color: $color-white;
		.top {
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-top: 1.4rem;

			.close {
				display: none;
			}
			.logo {
				display: flex;
				gap: 0.8rem;
				img {
					width: 2rem;
					height: 2rem;
				}
			}
		}

		.sidebar {
			display: flex;
			flex-direction: column;
			height: 86vh;
			position: relative;
			align-items: center;
			top: 3rem;

			h3 {
				font-weight: 500;
				font-size: 0.8rem;
			}
			a {
				display: flex;
				color: $color-info-dark;
				margin-left: 2rem;
				gap: 1rem;
				align-items: center;
				position: relative;
				height: 3.7rem;
				transition: all 300ms ease;
				width: 100%;
				span {
					font-size: 1.3rem;
				}
			}
			:hover {
				color: $color-primary;
				span {
					margin-left: 1rem;
				}
			}
			.active {
				background: $color-light;
				color: $color-primary;
				margin-left: 0;
				padding-right: 10px;
				span {
					color: $color-primary;
					margin-left: calc(0.8rem - 15px);
				}
			}
			a.active:before {
				content: '';
				width: 6px;
				height: 100%;
				background-color: $color-primary;
			}
			a:last-child {
				position: absolute;
				bottom: 2rem;
				width: 100%;
			}

			.message-count {
				background: $color-danger;
				color: $color-white;
				padding: 2px 10px;
				font-size: 11px;
				border-radius: $border-radius-1;
			}
		}
		@media screen and (max-width: 1200px) {
			.top {
				.logo {
					align-items: center;
					h2 {
						display: none;
					}
				}
			}
			.sidebar {
				h3 {
					display: none;
				}
				a {
					width: 100%;
				}
				:last-child {
					position: relative;
					margin-top: 1.8rem;
				}
			}
		}
		@media screen and (max-width: 768px) {
			position: fixed;
			left: 0;
			background-color: $color-white;
			width: 18rem;
			z-index: 3;
			box-shadow: 1rem 3rem 4rem $color-light;
			height: 100vh;
			padding-right: $card-padding;
			.close {
				display: block !important;
				cursor: pointer;
			}
			.sidebar {
				.logo {
					margin-left: 1rem;
					h2 {
						display: inline;
					}
				}
				h3 {
					display: inline-block;
				}

				a {
					width: 100%;
					height: 3.4rem;
				}
				a.last-child {
					position: absolute;
					bottom: 5rem;
				}
			}
		}
	}
</style>
