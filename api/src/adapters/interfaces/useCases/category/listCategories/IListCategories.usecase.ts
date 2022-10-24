import { IUseCase } from '@/app/useCases/IUseCase';
import { ListCategoriesInputDto, ListCategoriesOutputDto } from '@/app/useCases/post/listCategories';

export type IListCategoriesUseCase = IUseCase<ListCategoriesInputDto, ListCategoriesOutputDto>;
