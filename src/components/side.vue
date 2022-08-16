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
			<router-link to="/" exact-active-class="active" ref="a">
				<span class="material-icons">grid_view</span>
				<h3>Dashboard</h3>
			</router-link>

			<router-link to="/employees" exact-active-class="active" ref="a">
				<span class="material-icons">receipt_long</span>
				<h3>Orders</h3>
			</router-link>
			<!-- <a>
				<span class="material-icons">receipt_long</span>
				<h3>Orders</h3>
			</a>
			<a>
				<span class="material-icons">insights</span>
				<h3>Analytics</h3>
			</a>
			<a>
				<span class="material-icons">mail_outline</span>
				<h3>Messages</h3>
				<span class="message-count">26</span>
			</a> -->

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
		.top {
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-top: 1.4rem;
			.logo {
				display: flex;
				gap: 0.8rem;
				img {
					width: 2rem;
					height: 2rem;
				}
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
			h3 {
				font-weight: 500;
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
				text-decoration: none;
				h3 {
					font-size: 1rem;
				}
				span {
					font-size: 1.6rem;
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
				span {
					color: $color-primary;
					margin-left: calc(1rem - 3px);
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

			@keyframes showMenu {
				to {
					left: 0;
				}
			}
			.logo {
				margin-left: 1rem;
				h2 {
					display: inline;
				}
			}
			h3 {
				display: inline;
			}
			a {
				width: 100%;
				height: 3.4rem;
			}
			a.last-child {
				position: absolute;
				bottom: 5rem;
			}
			.close {
				display: block !important;
				cursor: pointer;
			}
		}
	}
</style>
