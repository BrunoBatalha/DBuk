import { IRepositoryTransaction } from './IRepositoryTransaction';

export interface IPostCategoryRepository extends IRepositoryTransaction {
	create(postId: number, categoryIds: number[]): Promise<void>;
}
