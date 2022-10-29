import { Post } from '@/domain/entities/Post';
import { UserDto } from './User.dto';

type PostDtoParams = {
	id: string;
	image: string;
	user: UserDto;
	createdAt: Date;
	amountReactions: number;
	isReacted: boolean;
};

export class PostDto {
	readonly id: string;
	readonly image: string;
	readonly user: UserDto;
	readonly createdAt: Date;
	readonly amountReactions: number;
	readonly isReacted: boolean;

	constructor(params: PostDtoParams) {
		this.id = params.id;
		this.createdAt = params.createdAt;
		this.image = params.image;
		this.user = params.user;
		this.amountReactions = params.amountReactions;
		this.isReacted = params.isReacted;
	}

	static convertDomainToDto(post: Post, userId: number): PostDto {
		return new PostDto({
			id: post.id?.toString() || '',
			createdAt: post.createdAt as Date,
			image: post.imageUri,
			amountReactions: post.amountReactions,
			isReacted: post.isReactedByUser(userId),
			user: new UserDto({
				id: post.userId,
				username: post.userUsername
			})
		});
	}
}
