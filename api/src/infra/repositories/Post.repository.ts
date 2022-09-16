import { IPostRepository } from '@/app/interfaces/repositories/IPost.repository';
import { Post, PostParams } from '@/domain/entities/Post';
import { IDatabaseAdapter } from '../interfaces/IDatabaseAdapter';
import { AbstractRepository } from './AbstractRepository';

export class PostRepository extends AbstractRepository<PostRepository> implements IPostRepository {
	constructor(databaseAdapter: IDatabaseAdapter) {
		super(databaseAdapter);
	}

	async create(post: Post): Promise<Post> {
		this.checkTransaction();
		const entity = await this.databaseAdapter.postModel.create({ userId: post.user.id }, this.transaction);

		return Post.create(entity as PostParams);
	}

	async list(): Promise<Post[]> {
		const ta = await this.databaseAdapter.postModel.list({}, this.includes);
		return ta as Post[];
	}

	protected getRepository(): PostRepository {
		return this;
	}
}
