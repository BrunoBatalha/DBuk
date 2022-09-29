import { IPostRepository } from '@/app/interfaces/repositories/IPost.repository';
import { Post, PostParams } from '@/domain/entities/Post';
import { User } from '@/domain/entities/User';
import { IDatabaseAdapter } from '../interfaces/IDatabaseAdapter';
import { PostModelType } from '../models-types/PostModelType';
import { AbstractRepository } from './AbstractRepository';

export class PostRepository extends AbstractRepository<PostRepository> implements IPostRepository {
	constructor(databaseAdapter: IDatabaseAdapter) {
		super(databaseAdapter);
	}

	async create(post: Post): Promise<Post> {
		this.checkTransaction();
		const entity = await this.databaseAdapter.postModel.create(
			{ userId: post.userId, imageUri: post.imageUri, createdAt: post.createdAt.toISOString() },
			this.transaction
		);

		return Post.create(entity as PostParams);
	}

	async list(): Promise<Post[]> {
		const list = (await this.databaseAdapter.postModel.list({}, this.includes)) as PostModelType[];
		return list.map((e) => {
			return Post.create({
				id: e.id,
				createdAt: e.createdAt,
				imageUri: e.imageUri,
				user: User.create({ username: e.user.username, id: e.user.id, password: '', posts: [] })
			});
		});
	}

	protected getRepository(): PostRepository {
		return this;
	}
}
