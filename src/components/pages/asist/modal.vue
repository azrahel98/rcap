<template>
	<div class="modal is-active"></div>
</template>

<script lang="ts" setup></script>
<style lang="scss" scoped>
	textarea,
	input {
		font-family: 'Ubuntu Mono', sans-serif;
		font-weight: 600;
	}
	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
	.modal-content {
		background-color: white;
		border-radius: 15px;

		.form {
			display: flex;
			align-items: center;
			padding-bottom: 2vh;
			padding-top: 1vh;
			padding-right: 1vh;
			height: 100%;
			.left {
				display: flex;
				flex-direction: column;
				align-items: center;
				gap: 3vh;
				height: 100%;
				width: 100%;
			}
			.other {
				display: flex;
				flex-direction: column;
				align-items: center;
				gap: 3vh;
				height: 100%;
				width: 100%;
				.detalle {
					display: flex;
					justify-content: space-around;
					gap: 2vh;
					align-items: center;
				}
				.field {
					width: 80%;
				}
				.details {
					width: max-content;
				}
				.papeleta {
					text-align: center;
					width: 40%;
				}
			}
			.select {
				position: relative;
				min-width: 200px;
				svg {
					position: absolute;
					right: 12px;
					top: calc(50% - 3px);
					width: 10px;
					height: 6px;
					stroke-width: 2px;
					stroke: #9098a9;
					fill: none;
					stroke-linecap: round;
					stroke-linejoin: round;
					pointer-events: none;
				}
				select {
					-webkit-appearance: none;
					padding: 7px 40px 7px 12px;
					width: 100%;
					border: 1px solid #e8eaed;
					border-radius: 5px;
					background: #fff;
					box-shadow: 0 1px 3px -2px #9098a9;
					cursor: pointer;
					font-family: inherit;
					font-size: 16px;
					transition: all 150ms ease;
					&:required {
						&:invalid {
							color: #5a667f;
						}
					}
					option {
						color: #223254;
					}
					option[value=''][disabled] {
						display: none;
					}
					&:focus {
						outline: none;
						border-color: #07f;
						box-shadow: 0 0 0 2px rgba(0, 119, 255, 0.2);
					}
					&:hover {
						& + svg {
							stroke: #07f;
						}
					}
				}
			}
			.sprites {
				position: absolute;
				width: 0;
				height: 0;
				pointer-events: none;
				user-select: none;
			}
		}
		.empleado {
			display: flex;
			width: 100%;
			padding: 1vh 2vh 0 2vh;
			justify-content: space-between;
			align-items: center;
			.nombre {
				display: flex;
				flex-direction: column;
				height: 100%;
				justify-content: center;
				gap: 1vh;
				.name {
					font-size: 1rem;
					font-weight: 600;
				}
				h4 {
					font-size: 0.7rem;
					font-weight: 500;
				}
			}
		}
	}
</style>
