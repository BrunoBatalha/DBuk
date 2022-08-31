import { Category } from './Category';
import { User } from './User';

export type PostParams = {
	id?: number;
	user: User;
};

export class Post {
	id?: number;
	user: User;
	private _categories: Category[] = [];

	public get categories(): Category[] {
		return this._categories;
	}

	constructor(params: PostParams) {
		this.id = params.id;
		this.user = params.user;
	}

	static create(params: PostParams): Post {
		return new Post(params);
	}

	addCategories(...categories: Category[]): void {
		const hasCategoriesRepeated = this.categories.some((c) => categories.some((cc) => cc === c));
		if (hasCategoriesRepeated) {
			throw new Error('category repeated');
		}

		this._categories = [...this.categories, ...categories];
	}
}
