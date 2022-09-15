import { ICreateUserValidator } from '@/adapters/interfaces/useCases/user/createUser/ICreateUser.validator';
import { IUserRepository } from '@/app/interfaces/repositories/IUser.repository';
import { ErrorMessageManager } from '@/domain/errors/ErrorMessageManager';
import { userErrorMessages } from '@/domain/errors/userErrorMessages';
import { CreateUserInputBoundary } from './boundaries/CreateUserInputBoundary';

export class CreateUserValidator implements ICreateUserValidator {
	private errorMessageManager: ErrorMessageManager;
	private userRepository: IUserRepository;

	constructor(userRepository: IUserRepository) {
		this.userRepository = userRepository;
		this.errorMessageManager = new ErrorMessageManager();
	}

	async validate(input: CreateUserInputBoundary): Promise<ErrorMessageManager> {
		if (!input.password) {
			this.errorMessageManager.add(userErrorMessages.passwordEmpty);
		}
		if (!input.username) {
			this.errorMessageManager.add(userErrorMessages.usernameEmpty);
		}

		const isUsernameExist = await this.userRepository.getByUsername(input.username);
		if (isUsernameExist) {
			this.errorMessageManager.add(userErrorMessages.usernameIsAlreadyInUse);
		}

		return this.errorMessageManager;
	}
}
