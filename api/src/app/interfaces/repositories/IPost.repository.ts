import { Post } from '@/domain/entities/Post';
import { IRepositoryTransaction } from './IRepositoryTransaction';

export interface IPostRepository extends IRepositoryTransaction {
	create(post: Post): Promise<Post>;
}
