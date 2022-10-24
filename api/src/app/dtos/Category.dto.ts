import { Category } from '@/domain/entities/Category';

type Params = {
	id: number;
	title: string;
};

export class CategoryDto {
	readonly id: number;
	readonly title: string;

	constructor(params: Params) {
		this.id = params.id;
		this.title = params.title;
	}

	static convertDomainToDto(category: Category): CategoryDto {
		return new CategoryDto({
			id: category.id,
			title: category.title
		});
	}
}
