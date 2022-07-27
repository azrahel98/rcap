<template>
	<div class="d-card">
		<h1>{{ prop.day }}</h1>
		<div class="b-card">
			<div class="d-marca">
				<ul>
					<li v-for="x in prop.list">{{ x['marca'] }}</li>
				</ul>
			</div>
			<div class="d-docs"></div>
		</div>
	</div>
</template>
<script lang="ts" setup>
	const prop = defineProps({
		day: { type: Number, required: true },
		list: { required: false },
		fs: { type: Boolean },
		fe: { type: Boolean },
		fi: { type: Boolean },
		color: { type: String },
	})
</script>
<style lang="scss" scoped>
	.d-card {
		background-color: white;
		border: 1px solid black;
		display: grid;
		height: 100%;
		width: 100%;
		grid-template-rows: 40px auto;
		row-gap: 2px;
		.b-card {
			display: grid;
			grid-template-columns: 50px 1fr;
			.d-marca {
				align-self: center;
				width: min-content;
				ul {
					list-style: none;
					width: fit-content;
				}
			}
			.d-docs {
			}
		}
	}
</style>
