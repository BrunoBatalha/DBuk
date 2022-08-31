import { IPostCategoryRepository } from '@/app/interfaces/repositories/IPostCategoryRepository';
import { Transaction } from 'sequelize';
import { IDatabaseAdapter } from '../interfaces/IDatabaseAdapter';

export class PostCategoryRepository implements IPostCategoryRepository {
	private databaseAdapter: IDatabaseAdapter;
	private transaction!: Transaction;

	constructor(databaseAdapter: IDatabaseAdapter) {
		this.databaseAdapter = databaseAdapter;
	}

	async create(postId: number, categoryIds: number[]): Promise<void> {
		this.checkTransaction();

		const entities = categoryIds.map((c) => ({ categoryId: c, postId }));
		await this.databaseAdapter.postCategoryModel.createMany(entities, this.transaction);
	}

	setTransaction(transaction: Transaction): void {
		this.transaction = transaction;
	}

	private checkTransaction(): void {
		if (!this.transaction) {
			throw new Error('transaction is null');
		}
	}
}
