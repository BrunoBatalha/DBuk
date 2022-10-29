import { Post } from '@/domain/entities/Post';
import { IRepositoryIncludes } from '@/infra/interfaces/repositories/IRepositoryIncludes';
import { PostRepository } from '@/infra/repositories';
import { IRepositoryTransaction } from './IRepositoryTransaction';

export interface IPostRepository extends IRepositoryTransaction, IRepositoryIncludes<IPostRepository> {
	create(post: Post): Promise<Post>;
	list(): Promise<Post[]>;
	listOrderBy(params: PostRepository.ListOrderByParams): Promise<Post[]>;
}
