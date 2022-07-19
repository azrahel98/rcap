<template>
	<div class="navigation">
		<ul>
			<div class="pages">
				<div class="iconpage">
					<li>
						<router-link to="/">
							<span class="icon">
								<span class="material-icons"> calendar_month </span>
							</span>
						</router-link>
					</li>
				</div>
				<div class="links">
					<li class="list">
						<router-link
							to="/"
							class="menu-item"
							exact-active-class="is-active"
						>
							<span class="icon">
								<span class="material-icons"> dashboard </span>
							</span>
							<span class="titulo">Dashboard</span>
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
								<span class="material-icons"> perm_contact_calendar </span>
							</span>
							<span class="titulo">Trabajadores</span>
						</router-link>
					</li>
				</div>
			</div>
			<li>
				<a class="menu-item">
					<span class="icon">
						<span class="material-icons"> logout </span>
					</span>
					<span class="titulo">Salir</span>
				</a>
			</li>
		</ul>
	</div>
</template>

<style lang="scss" scoped>
	.navigation {
		position: fixed;
		border-radius: 25px 25px 25px 25px;
		box-sizing: initial;
		border-left: 5px solid #4d5bf9;
		background: #4d5bf9;
		transition: width 0.5;
		top: 2px;
		left: 4px;
		bottom: 2px;
		min-width: 18vh;
		@media (max-width: 1024px) {
			min-width: 7vh;
			border-radius: 0 25px 25px 0;
			top: 0;
			left: 0;
			ul {
				li {
					width: 100%;
				}
				.pages {
					.iconpage {
						.material-icons {
							font-size: 2rem !important;
						}
					}
				}
			}
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
			padding-bottom: 40px;
			display: flex;
			flex-direction: column;

			justify-content: space-between;
			height: 100%;
			.pages {
				display: flex;
				flex-direction: column;
				height: max-content;
				gap: 10vh;
				.iconpage {
					text-align: center;
					.material-icons {
						color: white;
						font-size: 3rem;
					}
				}
			}

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
					height: 50px;
					position: relative;
					display: flex;
					text-decoration: none;
					color: #fff;
					align-items: center;
					justify-content: center;
					gap: 1vh;

					.icon {
						position: relative;

						.material-icons {
							font-size: 1.1em;
						}
					}
					.titulo {
						position: relative;
						font-family: 'Fira Sans', sans-serif;
						white-space: normal;
						font-weight: 600;
						letter-spacing: 0.8px;
						font-size: 0.65rem;
					}
				}
			}

			.is-active {
				background-color: white;
				border-radius: 25px 0 0 25px;
				.titulo {
					color: $alternative;
					font-weight: 800;
				}
				.icon {
					color: $accent;
				}
			}
		}
	}
</style>
