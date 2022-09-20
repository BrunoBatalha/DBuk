import { SavePostRequest } from 'data/usecases/publish-post/PublishPostUseCase';

export interface IPublishPostUseCase {
	save(request: SavePostRequest): Promise<void>;
}
