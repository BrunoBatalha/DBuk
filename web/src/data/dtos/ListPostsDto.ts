import Dtos from 'data/Dtos';
import { PostDomain } from 'domain/entities';

export type ListPostsDto = {
  list: PostDomain[];
  pagination: Dtos.PaginationDto;
};
