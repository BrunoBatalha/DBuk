import { Post } from '@/domain/entities/Post';
import { IRepositoryTransaction } from './IRepositoryTransaction';

export interface IPostRepository extends IRepositoryTransaction {
	create(post: Post): Promise<Post>;
	listOrderBy(params: IPostRepository.ListOrderByParams): Promise<{ total: number; list: Post[] }>;
}

export namespace IPostRepository {
	export type ListOrderByParams = {
		orderBy: 'DESC' | 'ASC';
		limit: number;
		offset: number;
		parameterToOrder: string;
	};
}
