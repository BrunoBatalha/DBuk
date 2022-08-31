import { Category } from '@/domain/entities/Category';

export interface ICategoryRepository {
	list(): Promise<Category[]>;
}
