<template>
	<router-view />
</template>

<style lang="scss">
	#app {
		font-family: 'Ubuntu Mono', sans-serif;
		text-align: center;
		background-color: $background;
	}
	* {
		margin: 0;
		overflow-y: hidden !important;
		padding: 0;
		box-sizing: border-box;
		font-family: 'Fira sans', sans-serif;
		font-weight: 400;
	}
	body {
		background-color: white;
	}
	input {
		font-family: 'Fira Sans';
		font-weight: 300;
	}
	.help {
		font-family: 'Ubuntu Mono', monospace;
	}
</style>
