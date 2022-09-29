import { Category } from './Category';
import { User } from './User';

export type PostParams = {
	id?: number;
	user: User;
	imageUri: string;
	createdAt: Date;
};

export class Post {
	id?: number;
	createdAt: Date;
	imageUri: string;
	private user: User;
	private categories: Category[] = [];

	constructor(params: PostParams) {
		this.id = params.id;
		this.user = params.user;
		this.createdAt = params.createdAt;
		this.imageUri = params.imageUri;
	}

	get listCategoriesFromPost(): Category[] {
		return this.categories;
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

	static create(params: PostParams): Post {
		return new Post(params);
	}

	addCategories(...categories: Category[]): void {
		const hasCategoriesRepeated = this.listCategoriesFromPost.some((c) => categories.some((cc) => cc === c));
		if (hasCategoriesRepeated) {
			throw new Error('category repeated');
		}

		this.categories = [...this.listCategoriesFromPost, ...categories];
	}
}
