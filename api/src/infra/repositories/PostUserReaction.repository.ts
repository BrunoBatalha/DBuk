import { IPostUserReactionRepository } from '@/app/interfaces/repositories/IPostUserReaction.repository';
import { IDatabaseAdapter } from '../interfaces/IDatabaseAdapter';
import { AbstractRepository } from './AbstractRepository';

export class PostUserReactionRepository extends AbstractRepository implements IPostUserReactionRepository {
	constructor(databaseAdapter: IDatabaseAdapter) {
		super(databaseAdapter);
	}

	async exists(userId: number, postId: number): Promise<boolean> {
		const entity = await this.databaseAdapter.postUserReactionModel.setTransaction(this.transaction).findOne({
			userId,
			postId
		});

		return !!entity;
	}

	async delete(userId: number, postId: number): Promise<void> {
		this.checkTransaction();

		await this.databaseAdapter.postUserReactionModel.setTransaction(this.transaction).delete({
			userId,
			postId
		});
	}

	async create(userId: number, postId: number, reactionId: number): Promise<void> {
		this.checkTransaction();

		await this.databaseAdapter.postUserReactionModel.setTransaction(this.transaction).create({
			userId,
			postId,
			reactionId
		});
	}
}
