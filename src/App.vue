<template>
	<div class="mainapp">
		<router-view />
	</div>
</template>

<style lang="scss">
	.mainapp {
		background-color: $color-background;
	}
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
		font-family: 'Poppins', sans-serif;
		font-weight: 400;
		outline: 0;
		border: none;
		:active,
		:focus {
			outline: 0;
			border: none;
		}
		span {
			font-weight: 600;
			font-size: 0.7rem;
		}
		button {
			font-size: 0.7rem !important;
		}
		::-webkit-scrollbar {
			width: 1rem;
		}
		a {
			color: $color-dark;
			text-decoration: none;
		}

		img {
			display: block;
			width: 100%;
		}
		h1 {
			font-weight: 800;
			font-size: 1.8rem;
		}
		h2 {
			font-size: 1.4rem;
		}
		h3 {
			font-size: 0.87rem;
		}
		h4 {
			font-size: 0.8rem;
		}
		h5 {
			font-size: 0.77rem;
		}
		small {
			font-size: 0.75rem;
		}
		p {
			color: $color-dark-variant;
		}
		b {
			color: $color-dark;
		}
	}

	.primary {
		color: $color-primary;
	}
	.danger {
		color: $color-danger;
	}
	.success {
		color: $color-success;
	}
	.warning {
		color: $color-warning;
	}
</style>
