import { IPostUserReactionRepository } from '@/app/interfaces/repositories/IPostUserReaction.repository';
import { Transaction } from 'sequelize';
import { IDatabaseAdapter } from '../interfaces/IDatabaseAdapter';

export class PostUserReactionRepository implements IPostUserReactionRepository {
	private transaction!: Transaction;

	constructor(private databaseAdapter: IDatabaseAdapter) { }

	async exists(userId: number, postId: number): Promise<boolean> {
		const entity = await this.databaseAdapter.postUserReactionModel.findOne({
			userId,
			postId
		});

		return !!entity;
	}

	async delete(userId: number, postId: number): Promise<void> {
		this.checkTransaction();

		await this.databaseAdapter.postUserReactionModel.delete(
			{
				userId,
				postId
			},
			this.transaction
		);
	}

	async create(userId: number, postId: number, reactionId: number): Promise<void> {
		this.checkTransaction();

		await this.databaseAdapter.postUserReactionModel.create(
			{
				userId,
				postId,
				reactionId
			},
			this.transaction
		);
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
