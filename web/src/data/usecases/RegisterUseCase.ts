import { IHttpClientAdapter } from 'data/interfaces/IHttpClientAdapter';
import { IRegisterUseCase } from 'presentation/interfaces/usecases/IRegisterUseCaseUseCase';

export class RegisterUseCase implements IRegisterUseCase {
	constructor(private httpClient: IHttpClientAdapter) { }

	async execute(request: RegisterUseCaseParams): Promise<void> {
		await this.httpClient.post<void>('users', request);
	}
}

export type RegisterUseCaseParams = {
	username: string;
	password: string;
};
