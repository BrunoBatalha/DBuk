import { RegisterParams } from 'data/usecases/register/RegisterUseCase';

export interface IRegisterUseCase {
	register(request: RegisterParams): Promise<void>;
}
