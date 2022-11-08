import { Token } from '../model/token'

import { LoginRepository } from '../repository/login'
import { MainApi } from '../http/axios'
import jwtDecode from 'jwt-decode'


class LoginImp implements LoginRepository {
	signout(): void {
		localStorage.clear()
	}
	check(): boolean {
		const token = localStorage.getItem('token')
		if (token === null) return false
		// if (moment(jwtDecode(token)['exp'] * 1000) < moment()) return false
		return true
	}
	async login(username: string, password: string): Promise<Token> {
		try {
			const result = await MainApi.getInstance().post(
				'/login',
				JSON.stringify({
					user: username,
					password,
				})
			)
			if (result.status !== 200) throw new Error(result.data)
			const deco: any = jwtDecode(JSON.parse(result.data)['value'])
			return {
				value: JSON.parse(result.data)['value'],
				admin: deco['admin'] === 'Y' ? true : false,
				expire: deco['exp'],
			}
		} catch (error) {
			throw error
		}
	}
}

export { LoginImp }
