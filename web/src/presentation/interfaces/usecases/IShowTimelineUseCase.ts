import { ListPostsDto } from 'data/dtos/ListPostsDto';

export interface IShowTimelineUseCase {
	list(): Promise<ListPostsDto>;
}
