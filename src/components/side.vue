<template>
	<aside>
		<div class="top">
			<div class="logo">
				<h2>EGA<span class="danger">TOR</span></h2>
			</div>
			<div class="close" id="close-btn">
				<span class="material-icons" v-on:click="clicka">close</span>
			</div>
		</div>
		<div class="sidebar">
			<router-link
				to="/"
				exact-active-class="active"
				ref="a"
				class="a-tag"
				v-on:click="clicka"
			>
				<span class="material-icons">grid_view</span>
				<h3>Dashboard</h3>
			</router-link>

			<router-link
				to="/employees"
				exact-active-class="active"
				ref="a"
				class="a-tag"
				v-on:click="clicka"
			>
				<span class="material-icons">people</span>
				<h3>Trabajadores</h3>
			</router-link>

			<a>
				<span class="material-icons">logout</span>
				<h3>Logout</h3>
			</a>
		</div>
	</aside>
</template>

<script lang="ts" setup>
	const clicka = () => {
		document.querySelector('aside').classList.toggle('open')
	}
</script>

<style lang="scss" scoped>
	aside {
		display: block;
		height: 100vh;
		width: 100%;
		.top {
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-top: 1.4rem;
			.logo {
				display: flex;
				gap: 0.8rem;
				width: 100%;
				justify-content: center;
				align-items: center;
			}
			.close {
				display: none;
			}
		}
		.sidebar {
			display: flex;
			flex-direction: column;
			height: 86vh;
			position: relative;
			top: 3rem;
			gap: 1rem;
			a {
				display: flex;
				color: $color-info-dark;
				margin-left: 0.8rem;
				gap: 0.5rem;
				width: 100%;
				align-items: center;
				position: relative;
				height: 3rem;
				transition: all 300ms ease;
				text-decoration: none;
				h3 {
					font-size: 0.79rem;
				}
				span {
					font-size: 1rem;
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
				margin-left: 3px;

				span {
					color: $color-primary;
					margin-left: calc(1rem - 3px);
				}
			}

			.active:before {
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
			.sidebar {
				h3 {
					display: none;
				}
				a {
					width: 5.6rem;
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
			display: none;
			animation: showMenu 400ms ease forwards;
			padding-right: 1vh;
			.sidebar {
				width: 100%;
				.a-tag {
					display: flex;
					align-items: center;
					height: max-content;
					width: 100%;
					h3 {
						display: block;
						height: min-content;
						align-items: center;
						height: 100%;
					}
					span {
						text-align: center;
					}
				}
			}
			@keyframes showMenu {
				to {
					left: 0;
				}
			}
			.close {
				display: block !important;
				cursor: pointer;
			}
		}
	}
</style>
