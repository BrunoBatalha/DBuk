import { ReactPostUseCaseParams } from 'data/usecases/react-post/ReactPostUseCase';

export interface IReactPostUseCase {
	execute(request: ReactPostUseCaseParams): Promise<void>;
}
