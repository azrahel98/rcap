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
				<router-link to="/" class="menu-item" exact-active-class="is-active">
					<i class="fa-solid fa-gauge-high"></i> Dashboard
				</router-link>
				<router-link
					to="/employees"
					class="menu-item"
					exact-active-class="is-active"
					><i class="fa-solid fa-book-medical"></i> Papeletas</router-link
				>
				<router-link to="/memo" class="menu-item" exact-active-class="is-active"
					><i class="fa-regular fa-building"></i> Trabajadores</router-link
				>
				<a @click="exit" class="menu-item"
					><i class="fa-solid fa-feather"></i
				></a>
			</nav>
		</aside>
	</div>
</template>

<script setup>
	import { ref } from 'vue'
	import LoginImp from '../../app/implement/login'
	import router from '../router/router'
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
	i {
		color: white;
	}
	.app {
		display: flex;
		height: 100vh !important;
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
		width: 22vh !important;
		background: #f6f7fc;
		backdrop-filter: blur(24px);
		z-index: 1;
		.menu .menu-item {
			display: flex;
			padding: 1em;
			color: black;
			padding-left: 2vh;
			gap: 2vh;
			text-decoration: none;
			justify-content: space-evenly;
			transition: 0.2s linear;
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
			color: black;
		}
	}
	.sidebar .menu .menu-item:hover,
	.sidebar .menu .menu-item.is-active {
		color: #623ce7;
		border-right: 5px solid #623ce7;
	}
	.menu-item.is-active {
		i {
			color: #623ce7;
		}
	}
	.sidebar .menu .menu-item:hover {
		border-right: 5px solid #623ce7;
		i {
			color: #623ce7;
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
	}
</style>
