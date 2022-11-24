import { IPostCategoryRepository } from '@/app/interfaces/repositories/IPostCategoryRepository';
import { IDatabaseAdapter } from '../interfaces/IDatabaseAdapter';
import { AbstractRepository } from './AbstractRepository';

export class PostCategoryRepository extends AbstractRepository implements IPostCategoryRepository {
	constructor(databaseAdapter: IDatabaseAdapter) {
		super(databaseAdapter);
	}

	async create(postId: number, categoryIds: number[]): Promise<void> {
		this.checkTransaction();

		const entities = categoryIds.map((c) => ({ categoryId: c, postId }));
		await this.databaseAdapter.postCategoryModel.setTransaction(this.transaction).createMany(entities);
	}
}
