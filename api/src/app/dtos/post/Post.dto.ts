import { Post } from '@/domain/entities/Post';
import { UserDto } from '../user/User.dto';

type PostDtoParams = {
	id: string;
	image: string;
	user: UserDto;
	createdAt: Date;
};

export class PostDto {
	readonly id: string;
	readonly image: string;
	readonly user: UserDto;
	readonly createdAt: Date;

	constructor(params: PostDtoParams) {
		this.id = params.id;
		this.createdAt = params.createdAt;
		this.image = params.image;
		this.user = params.user;
	}

	static convertDomainToDto(post: Post): PostDto {
		return new PostDto({
			id: post.id?.toString() || '',
			createdAt: post.createdAt,
			image: post.imageUri,
			user: new UserDto({
				id: post.userId,
				username: post.userUsername
			})
		});
	}
}
