import { IRepositoryTransaction } from './IRepositoryTransaction';

export interface IPostUserReactionRepository extends IRepositoryTransaction {
	exists(userId: number, postId: number): Promise<boolean>;
	delete(userId: number, postId: number): Promise<void>;
	create(userId: number, postId: number, reactionId: number): Promise<void>;
}
