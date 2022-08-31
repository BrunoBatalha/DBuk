import { IPostRepository } from '@/app/interfaces/repositories/IPost.repository';
import { IRepositoryTransaction } from '@/app/interfaces/repositories/IRepositoryTransaction';
import { Post, PostParams } from '@/domain/entities/Post';
import { Transaction } from 'sequelize';
import { IDatabaseAdapter } from '../interfaces/IDatabaseAdapter';
import { ModelName } from '../interfaces/ModelName';

export class PostRepository implements IPostRepository, IRepositoryTransaction {
	private databaseAdapter: IDatabaseAdapter;
	private transaction!: Transaction;

	constructor(databaseAdapter: IDatabaseAdapter) {
		this.databaseAdapter = databaseAdapter;
	}

	async create(post: Post): Promise<Post> {
		this.checkTransaction();

		const includes: ModelName[] = ['CategoryModel'];
		const entity = await this.databaseAdapter.postModel.create(
			{
				userId: post.user.id
			},
			this.transaction,
			includes
		);

		return Post.create(entity as PostParams);
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
