<template>
	<div class="contenedor">
		<article class="item">
			<p>Grid Item 1</p>
		</article>
		<article class="item">
			<p>Grid Item 2</p>
		</article>
		<article class="item">
			<p>Grid Item 3</p>
		</article>
		<article class="item">
			<p>Grid Item 4</p>
		</article>
		<article class="item">
			<p>Grid Item 5</p>
		</article>
		<article class="item">
			<p>Grid Item 6</p>
		</article>
		<article class="item">
			<p>Grid Item 7</p>
		</article>
		<article class="item">
			<p>Grid Item 8</p>
		</article>
		<article class="item">
			<p>Grid Item 9</p>
		</article>
		<article class="item">
			<p>Grid Item 10</p>
		</article>
		<article class="item">
			<p>Grid Item 11</p>
		</article>
		<article class="item">
			<p>Grid Item 12</p>
		</article>
		<article class="item">
			<p>Grid Item 13</p>
		</article>
		<article class="item">
			<p>Grid Item 14</p>
		</article>
		<article class="item">
			<p>Grid Item 15</p>
		</article>
		<article class="item">
			<p>Grid Item 16</p>
		</article>
		<article class="item">
			<p>Grid Item 17</p>
		</article>
		<article class="item">
			<p>Grid Item 18</p>
		</article>
		<article class="item">
			<p>Grid Item 19</p>
		</article>
	</div>
</template>

<style lang="scss" scoped>
	.contenedor {
		background-color: orange;
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(20vh, 1fr));
		gap: 1vh 1vh;

		article {
			background-color: gray;
			border: 1px solid white;
		}
	}
</style>
