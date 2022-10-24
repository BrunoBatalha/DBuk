import { CategoryDomain } from 'domain/post/CategoryDomain';

export interface IListCategoriesUseCase {
	execute(): Promise<CategoryDomain[]>;
}
