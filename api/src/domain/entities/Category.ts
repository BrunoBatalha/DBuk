export type CategoryParams = {
	id: number;
	title?: string;
};

export class Category {
	id: number;
	title?: string;

	constructor(params: CategoryParams) {
		this.id = params.id;
		this.title = params.title;
	}

	static create(params: CategoryParams): Category {
		return new Category(params);
	}
}
