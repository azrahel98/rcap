<template>
	<div class="dash">
		<div class="d-flex main" id="wrapper">
			<div class="border-end bg-white" id="sidebar-wrapper">
				<div class="sidebar-heading">MVS<span class="danger">LM</span></div>
				<div class="list-group">
					<div class="a-items">
						<router-link
							to="/"
							exact-active-class="active"
							ref="a"
							v-on:click="toggle"
						>
							<span class="material-icons">grid_view</span>
							<h3>Dashboard</h3>
						</router-link>
						<router-link
							to="/employees"
							exact-active-class="active"
							ref="a"
							v-on:click="toggle"
						>
							<span class="material-icons">badge</span>
							<h3>Trabajadores</h3>
						</router-link>
					</div>
					<div class="logout">
						<a
							class="list-group-item list-group-item-action list-group-item-light"
							>logout</a
						>
					</div>
				</div>
			</div>
			<!-- Page content wrapper-->
			<div id="page-content-wrapper">
				<!-- Top navigation-->
				<nav
					class="navbar navbar-expand-lg navbar-light bg-light border-bottom"
				>
					<div class="container">
						<button class="btn btn-primary" id="sidebarToggle" @click="toggle">
							<span class="material-icons">menu</span>
						</button>
					</div>
				</nav>
				<!-- Page content-->
				<div class="container">
					<router-view></router-view>
				</div>
			</div>
		</div>
	</div>
</template>
<script lang="ts" setup>
	import { onMounted } from 'vue'
	import { userStore } from '@store/user'

	const user = userStore()
	onMounted(() => {
		user.InitAdmin()
	})

	const toggle = () => {
		document.body.classList.toggle('sb-sidenav-toggled')
	}
</script>

<style lang="scss" scoped>
	.dash {
		height: 100vh;
		font-family: poppins, sans-serif;
		font-size: 0.88rem;
		background-color: $color-background;
		// overflow: hidden;
	}

	#sidebar-wrapper {
		min-height: 100vh !important;
		margin-left: -15rem;
		-webkit-transition: margin 0.25s ease-out;
		-moz-transition: margin 0.25s ease-out;
		-o-transition: margin 0.25s ease-out;
		transition: margin 0.25s ease-out;
		width: min-content;
		.sidebar-heading {
			padding: 0.875rem 1.25rem;
			font-size: 1.2rem;
			font-weight: 600;
			text-align: center;
		}
		.list-group {
			width: 15rem;
			height: 90vh;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			.a-items {
				a {
					height: min-content;
					border: none;
					display: flex;
					justify-content: center;
					gap: 2vh;
					align-items: center;
				}
			}
		}
	}

	#page-content-wrapper {
		min-width: 100vw;
	}

	body.sb-sidenav-toggled #wrapper #sidebar-wrapper {
		margin-left: 0;
	}

	@media (min-width: 768px) {
		#sidebar-wrapper {
			margin-left: 0;
		}

		#page-content-wrapper {
			min-width: 0;
			width: 100%;
		}

		body.sb-sidenav-toggled #wrapper #sidebar-wrapper {
			margin-left: -15rem;
		}
	}
</style>
