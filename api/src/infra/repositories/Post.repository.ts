import { IPostRepository } from '@/app/interfaces/repositories/IPost.repository';
import { Post, Reaction, User } from '@/domain/entities';
import { IDatabaseAdapter } from '../interfaces/IDatabaseAdapter';
import { PostModelType } from '../models-types/PostModelType';
import { AbstractRepository } from './AbstractRepository';

export class PostRepository extends AbstractRepository implements IPostRepository {
	constructor(databaseAdapter: IDatabaseAdapter) {
		super(databaseAdapter);
	}

	async create(post: Post): Promise<Post> {
		this.checkTransaction();

		const entity = await this.databaseAdapter.postModel.setTransaction(this.transaction).create({
			userId: post.userId,
			imageUri: post.imageUri,
			createdAt: post.createdAt.toISOString()
		});

		return Post.create(entity as Post.Params);
	}

	async listOrderBy(params: IPostRepository.ListOrderByParams): Promise<{ total: number; list: Post[] }> {
		const { total } = await this.databaseAdapter.postModel.list();
		const { list } = await this.databaseAdapter.postModel
			.setLimit(params.limit)
			.setOffset(params.offset)
			.setOrderBy(params.orderBy)
			.setParameterToOrder(params.parameterToOrder)
			.addInclude(['user', 'reactions', 'usersReactions'])
			.list();

		return {
			total: total,
			list: this.convertPostModelTypeToDomain(list as PostModelType[])
		};
	}

	private convertPostModelTypeToDomain(list: PostModelType[]): Post[] {
		return list.map((e) =>
			Post.create({
				id: e.id,
				createdAt: e.createdAt,
				imageUri: e.imageUri,
				reactions: e.reactions.map((r) => Reaction.create({ id: r.id, title: r.title as Reaction.ReactionEnum })),
				usersReactions: e.usersReactions.map((ur) => ({ userId: ur.id })),
				user: User.create({ username: e.user.username, id: e.user.id, password: '', posts: [] })
			})
		);
	}
}
