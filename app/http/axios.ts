import { Axios } from 'axios'

class MainApi extends Axios {
	private static classInstance?: MainApi
	private constructor() {
		super({
			baseURL: 'http://backend.azr4el.com',
			// baseURL: 'http://192.168.18.36:3000',
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Headers':
					'POST, GET, PUT, DELETE, OPTIONS, HEAD, Authorization, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Access-Control-Allow-Origin',
				'Content-Type': 'application/json',
				Token: `${localStorage.getItem('token')}`,
			},
		})
	}
	public static getInstance() {
		if (!this.classInstance) {
			this.classInstance = new MainApi()
		}
		return this.classInstance
	}
	public login = async (username: string, password: string) => {
		try {
			const result = await this.post(
				'/login',
				JSON.stringify({
					user: username,
					password: password,
				})
			)
			console.log(result)
		} catch (error) {
			console.log(error)
		}
	}
	// public getUser = (id: string) => this.instance.get<User>(`/users/${id}`)
}

export { MainApi }
