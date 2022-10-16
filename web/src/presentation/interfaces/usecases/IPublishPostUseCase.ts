import { PublishPostUseCaseParams } from 'data/usecases/publish-post/PublishPostUseCase';

export interface IPublishPostUseCase {
	execute(request: PublishPostUseCaseParams): Promise<void>;
}
