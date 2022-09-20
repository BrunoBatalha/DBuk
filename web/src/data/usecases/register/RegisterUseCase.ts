import { IHttpClientAdapter } from 'data/interfaces/IHttpClientAdapter';
import { IRegisterUseCase } from 'presentation/interfaces/usecases/IRegisterUseCaseUseCase';

export class RegisterUseCase implements IRegisterUseCase {
	constructor(private httpClient: IHttpClientAdapter) { }

	async register(request: RegisterParams): Promise<void> {
		await this.httpClient.post<void>('users', request);
	}
}

export type RegisterParams = {
	username: string;
	password: string;
};
