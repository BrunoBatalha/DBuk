import { RegisterUseCaseParams } from 'data/usecases/register/RegisterUseCase';

export interface IRegisterUseCase {
	execute(request: RegisterUseCaseParams): Promise<void>;
}
