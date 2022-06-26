import { LoginError } from '../tools/login'

export interface LoginRep {
	login(username: string, password: string): Promise<LoginError>
	ckeck(): boolean
	cerrarSession(): void
}
