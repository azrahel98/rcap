<template>
	<div class="container-1">
		<div class="login">
			<div class="card shadow-lg">
				<div class="card-body p-5">
					<h1 class="fs-4 card-title fw-bold mb-4">RCAP</h1>
					<form
						class="needs-validation"
						@submit.prevent="login()"
						autocomplete="off"
					>
						<div class="mb-3">
							<label class="mb-2 text-muted" for="user">Usuario</label>
							<input
								id="user"
								type="text"
								class="form-control"
								name="user"
								v-model="user"
								required
								autofocus
							/>
						</div>

						<div class="mb-3">
							<div class="mb-2 w-100">
								<label class="text-muted" for="current_password"
									>Password</label
								>
							</div>
							<input
								id="current_password"
								type="password"
								class="form-control"
								name="current_password"
								v-model="pass"
								required
							/>
						</div>

						<div>
							<button type="submit" class="btn btn-light">Login</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
	import { LoginImp } from '@/implement/loginImp'
	import { ref } from 'vue'
	import { useToast } from 'vue-toastification'
	import router from '../router/router'

	const toast = useToast()
	const user = ref<string>()
	const pass = ref<string>()

	const logim = new LoginImp()

	const login = async () => {
		try {
			const data = await logim.login(user.value, pass.value)
			localStorage.setItem('token', data.value)
			router.go(0)
		} catch (error) {
			toast.error((error as Error).message, {
				timeout: 3000,
				icon: {
					iconClass: 'material-icons',
					iconChildren: 'error',
					iconTag: 'span',
				},
				toastClassName: 'toast_custom',
			})
		}
	}
</script>

<style lang="scss" scoped>
	.container-1 {
		.login {
			height: 100vh;
			width: 100%;
			text-align: center;
			display: flex;
			justify-content: center;
			align-items: center;
			.card {
				border: none;
				text-align: center;
				height: min-content;
				button {
					width: 100%;
				}
			}
		}
	}
</style>
