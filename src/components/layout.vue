<template>
	<div class="app">
		<div class="menu-toggle" @click="click">
			<div class="hamburger">
				<i class="fa-solid fa-ellipsis" v-if="isExpanded"></i>
				<i class="fa-solid fa-bars" v-else></i>
			</div>
		</div>
		<aside class="sidebar" :class="isExpanded ? 'is-active' : ''">
			<h3>menu</h3>
			<nav class="menu" :class="isExpanded ? 'is-active' : ''">
				<div class="items">
					<router-link to="/" class="menu-item" exact-active-class="is-active">
						<i class="fa-solid fa-gauge-high"></i> Dashboard
					</router-link>
					<router-link
						to="/employees"
						class="menu-item"
						exact-active-class="is-active"
						><i class="fa-solid fa-book-medical"></i> Trabajadores</router-link
					>
					<router-link
						v-if="employ.dni !== ''"
						:to="{ name: 'asistencia', params: { dni: employ.dni } }"
						class="menu-item"
						exact-active-class="is-active"
						><i class="fa-solid fa-user-clock"></i>{{ employ.dni }}
					</router-link>
				</div>
				<div class="exit">
					<a @click="exit" class="menu-item"
						><i class="fa-solid fa-feather"></i>Salir</a
					>
				</div>
			</nav>
		</aside>
	</div>
</template>

<script lang="ts" setup>
	import { ref } from 'vue'
	import LoginImp from '@/implement/login'
	import router from '../router/router'
	import { EmployStore } from '@store/employ'

	const employ = EmployStore()

	const isExpanded = ref(false)

	const e = defineEmits(['change'])

	const click = () => {
		isExpanded.value = !isExpanded.value
		e('change', isExpanded.value)
	}
	const exit = () => {
		new LoginImp().cerrarSession()
		router.go(0)
	}
</script>

<style lang="scss" scoped>
	.app {
		display: flex;
		height: 100vh !important;
		border-right: 0px solid gray;
	}
	.menu-toggle {
		display: none;
		position: fixed;
		top: 0.5rem;
		right: 0.5rem;
		width: 40px;
		height: 40px;
		border-radius: 99px;
		background-color: #2e3047;
		cursor: pointer;
	}
	.hamburger {
		position: relative;
		top: calc(50% - 2px);
		left: 50%;
		transform: translate(-50%, -50%);
		width: 32px;
	}
	.hamburger > span,
	.hamburger > span::before,
	.hamburger > span::after {
		display: block;
		position: absolute;
		width: 100%;
		height: 4px;
		border-radius: 99px;
		background-color: #fff;
		transition-duration: 0.25s;
	}
	.hamburger > span::before {
		content: '';
		top: -8px;
	}
	.hamburger > span::after {
		content: '';
		top: 8px;
	}
	.menu-toggle.is-active .hamburger > span {
		transform: rotate(45deg);
	}
	.menu-toggle.is-active .hamburger > span::before {
		top: 0;
		transform: rotate(0deg);
	}
	.menu-toggle.is-active .hamburger > span::after {
		top: 0;
		transform: rotate(90deg);
	}
	.sidebar {
		flex: 1 1 0;
		padding: 2rem 1rem;
		width: 25vh !important;
		background: $bsidebar;
		backdrop-filter: blur(24px);
		z-index: 1;
		.menu {
			height: 100%;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			.items {
				padding-top: 4vh;
				gap: 2vh;
				display: flex;
				flex-direction: column;
				justify-content: flex-start;
				.menu-item {
					display: flex;
					justify-content: flex-start;
					align-items: center;
					color: rgb(124, 121, 121);
					padding-left: 2vh;
					gap: 10%;
					font-weight: 400;
					padding-left: 20%;
					font-size: 0.78rem;
					text-decoration: none;
					transition: 0.2s linear;
					.fa-solid {
						color: transparent;
						-webkit-text-stroke-width: 0.5px;
						-webkit-text-stroke-color: #aeaeae;
					}
				}
			}
			.exit {
				min-height: 20px;
				display: flex;
				justify-content: center;
				.menu-item {
					display: flex;
					justify-content: flex-start;
					align-items: center;
					color: black;
					padding-left: 2vh;
					gap: 10%;
					font-weight: 400;
					padding-left: 20%;
					width: 100%;
					font-size: 0.78rem;
					text-decoration: none;
					transition: 0.2s linear;
				}
			}
		}
	}
	.sidebar h3 {
		color: #707793;
		font-size: 0.75rem;
		text-transform: uppercase;
		margin-bottom: 0.5em;
	}
	.sidebar .menu {
		margin: 0 -1rem;
		i {
			color: $primary;
		}
	}
	.sidebar .menu .menu-item:hover,
	.sidebar .menu .menu-item.is-active {
		color: $accent;
		border-right: 5px solid $accent;
	}
	.menu-item.is-active {
		i {
			color: $accent;
		}
	}
	.sidebar .menu .menu-item:hover {
		border-right: 5px solid $accent;
		i {
			color: $accent;
		}
	}
	@media (max-width: 1024px) {
		.sidebar {
			max-width: 200px;
		}
	}
	@media (max-width: 768px) {
		.menu-toggle {
			display: block;
		}
		.content {
			padding-top: 8rem;
		}
		.sidebar {
			position: fixed;
			top: 0;
			left: -300px;
			height: 100vh;
			width: 100%;
			max-width: 300px;
			transition: 0.2s linear;
		}
		.sidebar.is-active {
			left: 0;
		}
		.exit {
			padding-bottom: 10vh;
		}
	}
</style>
