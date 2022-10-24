import { ListCategoriesController } from '@/adapters/controllers/categories/ListCategories.controller';
import { ListCategoriesUseCase, ListCategoriesValidator } from '@/app/useCases/post/listCategories';
import { AuthenticationValidator } from '@/app/useCases/user/authentication/Authentication.validator';
import { DatabaseAdapter } from '@/infra/database/DatabaseAdapter';
import { CategoryRepository } from '@/infra/repositories/Category.repository';
import { UserRepository } from '@/infra/repositories/User.repository';

export class ListCategoriesControllerFactory {
	static create(): ListCategoriesController {
		const databaseAdapter = new DatabaseAdapter();
		const userRepository = new UserRepository(databaseAdapter);
		const categoryRepository = new CategoryRepository(databaseAdapter);
		const usecase = new ListCategoriesUseCase(categoryRepository);
		const authenticationValidator = new AuthenticationValidator(userRepository);
		const validator = new ListCategoriesValidator(authenticationValidator);

		return new ListCategoriesController({ usecase, validator });
	}
}
