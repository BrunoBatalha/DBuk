import { IListCategoriesUseCase } from '@/adapters/interfaces/useCases/category/listCategories/IListCategories.usecase';
import { CategoryDto } from '@/app/dtos';
import { ICategoryRepository } from '@/app/interfaces/repositories/ICategory.repository';
import { ListCategoriesInputDto, ListCategoriesOutputDto } from './dtos';

export class ListCategoriesUseCase implements IListCategoriesUseCase {
	constructor(private categoryRepository: ICategoryRepository) { }

	async execute(_input: ListCategoriesInputDto): Promise<ListCategoriesOutputDto> {
		const categories = await this.categoryRepository.list();
		return {
			list: categories.map((c) => CategoryDto.convertDomainToDto(c))
		};
	}
}
