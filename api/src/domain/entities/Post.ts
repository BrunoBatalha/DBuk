import { Reaction, User } from '.';

export class Post {
	id?: number;
	createdAt: Date;
	imageUri: string;
	private user: User;
	private reactions: Reaction[] = [];
	private usersReactions: Post.UsersReactions[] = [];

	constructor(params: Post.Params) {
		this.id = params.id;
		this.user = params.user;
		this.createdAt = params.createdAt;
		this.imageUri = params.imageUri;
		this.reactions = params.reactions || [];
		this.usersReactions = params.usersReactions || [];
	}

	get userId(): number {
		if (!this.user?.id) {
			throw new Error('Get user.id invalid');
		}

		return this.user.id;
	}

	get userUsername(): string {
		return this.user.username;
	}

	get amountReactions(): number {
		return this.usersReactions.length;
	}

	isReactedByUser(userId: number): boolean {
		return this.usersReactions.some((pur) => pur.userId === userId);
	}

	static create(params: Post.Params): Post {
		return new Post(params);
	}
}

export namespace Post {
	export type Params = {
		id?: number;
		user: User;
		imageUri: string;
		createdAt: Date;
		reactions?: Reaction[];
		usersReactions?: Post.UsersReactions[];
	};

	export type UsersReactions = {
		userId: number;
	};
}
