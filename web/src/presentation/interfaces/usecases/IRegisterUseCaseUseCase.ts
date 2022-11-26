import { RegisterUseCaseParams } from 'data/usecases/RegisterUseCase';

export interface IRegisterUseCase {
  execute(request: RegisterUseCaseParams): Promise<void>;
}
