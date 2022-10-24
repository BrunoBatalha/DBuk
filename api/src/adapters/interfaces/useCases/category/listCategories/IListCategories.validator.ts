import { IValidator } from '@/app/useCases/IValidator';
import { ListCategoriesInputDto } from '@/app/useCases/post/listCategories/dtos';

export type IListCategoriesValidator = IValidator<ListCategoriesInputDto>;
