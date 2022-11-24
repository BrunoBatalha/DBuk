import { ReactPostUseCaseParams } from 'data/usecases/ReactPostUseCase';

export interface IReactPostUseCase {
	execute(request: ReactPostUseCaseParams): Promise<void>;
}
