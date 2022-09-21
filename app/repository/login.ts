import { Token } from '../model/token'

export interface LoginRepository {
	check(): boolean
	login(username: string, password: string): Promise<Token | null>
}
