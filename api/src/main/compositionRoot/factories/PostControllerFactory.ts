import { PostController } from '@/adapters/controllers/Post.controller';
import { PublishPostUseCase } from '@/app/useCases/post/publishPost/PublishPost.usecase';
import { PublishPostValidator } from '@/app/useCases/post/publishPost/PublishPost.validator';
import { AuthenticationValidator } from '@/app/useCases/user/authentication/Authentication.validator';
import { DatabaseAdapter } from '@/infra/database/DatabaseAdapter';
import { ManagerTransactions } from '@/infra/database/ManagerTransactions';
import { CategoryRepository } from '@/infra/repositories/Category.repository';
import { PostRepository } from '@/infra/repositories/Post.repository';
import { PostCategoryRepository } from '@/infra/repositories/PostCategory.repository';
import { UserRepository } from '@/infra/repositories/User.repository';

export class PostControllerFactory {
	static create(): PostController {
		const databaseAdapter = new DatabaseAdapter();
		const userRepository = new UserRepository(databaseAdapter);
		const postRepository = new PostRepository(databaseAdapter);
		const postCategoryRepository = new PostCategoryRepository(databaseAdapter);
		const categoryRepository = new CategoryRepository(databaseAdapter);
		const managerTransactions = new ManagerTransactions();
		const usecase = new PublishPostUseCase(postRepository, postCategoryRepository, managerTransactions);
		const authenticationValidator = new AuthenticationValidator(userRepository);
		const validator = new PublishPostValidator(authenticationValidator, categoryRepository);

		return new PostController({ usecase, validator });
	}
}
