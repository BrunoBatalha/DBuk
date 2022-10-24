import { ReactPostController } from '@/adapters/controllers/post/ReactPost.controller';
import { ReactPostUseCase } from '@/app/useCases/post/reactPost/ReactPost.usecase';
import { ReactPostValidator } from '@/app/useCases/post/reactPost/ReactPost.validator';
import { AuthenticationValidator } from '@/app/useCases/user/authentication/Authentication.validator';
import { DatabaseAdapter } from '@/infra/database/DatabaseAdapter';
import { ManagerTransactions } from '@/infra/database/ManagerTransactions';
import { PostUserReactionRepository } from '@/infra/repositories/PostUserReaction.repository';
import { UserRepository } from '@/infra/repositories/User.repository';

export class ReactPostControllerFactory {
	static create(): ReactPostController {
		const databaseAdapter = new DatabaseAdapter();
		const userRepository = new UserRepository(databaseAdapter);
		const postUserReactionRepository = new PostUserReactionRepository(databaseAdapter);
		const managerTransactions = new ManagerTransactions();
		const usecase = new ReactPostUseCase(postUserReactionRepository, managerTransactions);
		const authenticationValidator = new AuthenticationValidator(userRepository);
		const validator = new ReactPostValidator(authenticationValidator);

		return new ReactPostController({ usecase, validator });
	}
}
