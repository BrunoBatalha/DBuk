import { ListPostsDto } from 'data/dtos/ListPostsDto';

export interface IShowTimelineUseCase {
	execute(): Promise<ListPostsDto>;
}
