<template>
	<div class="contenedor">
		<div class="card">
			<div class="card-content">
				<p class="title is-3">Login</p>
				<div class="form">
					<div class="username">
						<label class="label">Nombre</label>
						<div class="control has-icons-left has-icons-right">
							<input
								class="input"
								:class="haserror?.value == 0 ? 'is-danger' : ''"
								type="text"
								placeholder="admin"
								v-model="username"
							/>
							<span class="icon is-small is-left">
								<i class="fas fa-user"></i>
							</span>
						</div>
						<p class="help is-danger" v-if="haserror?.value == 0">
							{{ haserror.messa }}
						</p>
					</div>
					<div class="password">
						<label class="label">Contraseña</label>
						<div class="control" :class="isloading ? 'is-loading' : ''">
							<input
								class="input"
								:class="haserror?.value == 1 ? 'is-danger' : ''"
								type="password"
								placeholder="*******"
								required
								v-model="password"
							/>
						</div>
						<p class="help is-danger" v-if="haserror?.value == 1">
							{{ haserror.messa }}
						</p>
					</div>
					<button
						class="button"
						:class="isloading ? 'is-loading' : ''"
						@click="login"
						:disabled="isloading"
					>
						Log In
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
	import { ref } from 'vue'
	import LoginImp from '../../app/implement/login'
	import { LoginError } from '../../app/tools/login'

	const isloading = ref(false)
	const haserror = ref<LoginError>()

	const username = ref<string>('')
	const password = ref<string>('')

	var logim = new LoginImp()

	const login = async () => {
		isloading.value = true
		haserror.value = await logim.login(username.value, password.value)
		isloading.value = false
	}
</script>

<style lang="scss" scoped>
	.contenedor {
		background-color: #f6f7fc;
		height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		.card {
			background-color: white;
			border-radius: 18px;
			.title {
				font-family: 'Fira Sans', sans-serif !important;
			}
			.form {
				display: flex;
				flex-direction: column;
				gap: 4vh;
				input {
					font-family: 'Asul', sans-serif;
					font-weight: 400;
					font-size: 0.8rem;
				}

				.help {
					text-align: left;
				}
				.label {
					text-align: left;
					font-size: 0.9rem;
					font-weight: 500;
				}
				.button {
					box-shadow: none;
				}
			}
		}
	}
</style>
