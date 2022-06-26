import { GraphQLError } from 'graphql'
import { gql } from 'graphql-tag'
import jwtDecode from 'jwt-decode'
import router from '../../src/router/router'
import { LoginRep } from '../repository/login'
import { Client } from '../service/graphl'
import { LoginError } from '../tools/login'

export default class LoginImp implements LoginRep {
	async login(username: string, password: string): Promise<LoginError> {
		try {
			if (username == null || password == null) {
				throw new Error('1')
			}
			var query = gql`
				 {
					login(username: "${username}" , password: "${password}") {
						token
					}
				}
			`
			const result = await Client.query({
				query,
			})
			localStorage.setItem('auth', result.data.login.token)
			router.go(0)
			return {}
		} catch (error) {
			if ((error as GraphQLError).message == 'contraseña incorrecta') {
				return { messa: error.message, value: 1 }
			} else {
				return { messa: error.message, value: 0 }
			}
		}
	}
	cerrarSession(): void {
		localStorage.clear()
	}

	ckeck(): boolean {
		try {
			if (localStorage.getItem('auth')) {
				var token = localStorage.getItem('auth')
				jwtDecode(token!, { header: true })
				var jwt: any = jwtDecode(token!)
				var expir = new Date(jwt['exp'] * 1000)
				if (expir < new Date()) {
					return false
				}
				return true
			}
			return false
		} catch (error) {
			console.log(error)
			return false
		}
	}
}
