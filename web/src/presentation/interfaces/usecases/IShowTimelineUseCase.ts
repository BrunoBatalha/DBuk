import { ListPostsDto } from 'data/dtos/ListPostsDto';

export interface IShowTimelineUseCase {
  execute(page: number, perPage: number): Promise<ListPostsDto>;
}
