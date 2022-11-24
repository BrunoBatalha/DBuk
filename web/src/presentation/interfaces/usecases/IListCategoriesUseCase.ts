import { CategoryDomain } from 'domain/entities/post/CategoryDomain';

export interface IListCategoriesUseCase {
	execute(): Promise<CategoryDomain[]>;
}
