<template>
	<router-view />
</template>

<style lang="scss">
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
	}
</style>
