import { PublishPostUseCaseParams } from 'data/usecases/PublishPostUseCase';

export interface IPublishPostUseCase {
	execute(request: PublishPostUseCaseParams): Promise<void>;
}
