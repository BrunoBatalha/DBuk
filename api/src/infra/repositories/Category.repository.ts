import { ICategoryRepository } from '@/app/interfaces/repositories/ICategory.repository';
import { Category, CategoryParams } from '@/domain/entities/Category';
import { IDatabaseAdapter } from '../interfaces/IDatabaseAdapter';

export class CategoryRepository implements ICategoryRepository {
	private databaseAdapter: IDatabaseAdapter;

	constructor(databaseAdapter: IDatabaseAdapter) {
		this.databaseAdapter = databaseAdapter;
	}

	async list(): Promise<Category[]> {
		const data = await this.databaseAdapter.categoryModel.list({});
		return data.map((d) => Category.create(d as CategoryParams));
	}
}
