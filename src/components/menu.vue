<template>
	<div class="navigation">
		<ul>
			<li class="list">
				<router-link to="/" class="menu-item" exact-active-class="is-active">
					<span class="icon">
						<span class="material-icons md-18">face</span>
					</span>
					<span class="titulo">Home</span>
				</router-link>
			</li>
			<li class="list">
				<router-link
					to="/employees"
					class="menu-item"
					exact-active-class="is-active"
					ref="a"
				>
					<span class="icon">
						<span class="material-icons md-18">face</span>
					</span>
					<span class="titulo">Home</span>
				</router-link>
			</li>
		</ul>
	</div>
</template>

<style lang="scss" scoped>
	.navigation {
		position: fixed;
		border-radius: 0 25px 25px 0;
		box-sizing: initial;
		border-left: 5px solid #4d5bf9;
		background: #4d5bf9;
		transition: width 0.5;
		top: 0px;
		left: 0;
		bottom: 0px;
		min-width: 15vh;
		@media (max-width: 1024px) {
			min-width: 7vh;
			border-radius: 0 25px 0 0;
			.titulo {
				display: none;
			}
			.is-active {
				background-color: white;
				border-radius: 25px 0 0 25px;
				.icon {
					color: #333;
				}
			}
		}
		ul {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			padding-left: 5px;
			padding-top: 40px;
			li {
				position: relative;
				list-style: none;
				width: 100%;
				border-top-left-radius: 20px;
				border-top-right-radius: -20px;
				border-bottom-left-radius: 20px;
				border-bottom-right-radius: 20px;
				border-top-right-radius: 20px;

				.menu-item {
					width: 100%;
					height: 60px;
					position: relative;
					display: flex;
					text-decoration: none;
					color: #fff;
					align-items: center;
					justify-content: space-around;

					.icon {
						position: relative;

						.material-icons {
							font-size: 1.5em;
						}
					}
					.titulo {
						position: relative;

						white-space: normal;
					}
				}
			}

			.is-active {
				background-color: white;
				border-radius: 25px 0 0 25px;
				.icon,
				.titulo {
					color: #333;
				}
			}
		}
	}
</style>
