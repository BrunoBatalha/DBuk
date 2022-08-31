import { Post } from './Post';

export type UserParams = {
	id?: number;
	username: string;
	password: string;
	posts: Post[];
};

export class User {
	id?: number;
	username: string;
	password: string;
	posts: Post[];

	private constructor(params: UserParams) {
		this.id = params.id;
		this.username = params.username;
		this.password = params.password;
		this.posts = params.posts;
	}

	static create(params: UserParams): User {
		return new User(params);
	}
}
