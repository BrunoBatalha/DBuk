import { UserController } from '@/adapters/controllers/User.controller';
import { CreateUserUseCase } from '@/app/useCases/user/createUser/CreateUser.usecase';
import { CreateUserValidator } from '@/app/useCases/user/createUser/CreateUser.validator';
import { DatabaseAdapter } from '@/infra/database/DatabaseAdapter';
import { UserRepository } from '@/infra/repositories/User.repository';

export class UserControllerFactory {
	static create(): UserController {
		const databaseAdapter = new DatabaseAdapter();
		const userRepository = new UserRepository(databaseAdapter);
		const createUserUseCase = new CreateUserUseCase(userRepository);
		const createUserValidator = new CreateUserValidator(userRepository);

		return new UserController({
			createUserUseCase: createUserUseCase,
			createUserValidator: createUserValidator
		});
	}
}
