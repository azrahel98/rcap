import { Axios } from 'axios'

class MainApi extends Axios {
	private static classInstance?: MainApi
	private constructor() {
		super({ baseURL: 'http://backend.azr4el.com' })
	}
	public static getInstance() {
		if (!this.classInstance) {
			this.classInstance = new MainApi()
		}
		return this.classInstance
	}
	public login = async (username: string, password: string) => {
		try {
			const result = await this.post('/login', {
				username,
				password,
			})
			console.log(result)
		} catch (error) {
			console.log(error)
		}
	}
	// public getUser = (id: string) => this.instance.get<User>(`/users/${id}`)
}

export { MainApi }
