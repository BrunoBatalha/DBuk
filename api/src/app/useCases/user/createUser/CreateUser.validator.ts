import { ICreateUserValidator } from '@/adapters/interfaces/useCases/user/createUser/ICreateUser.validator';
import { IUserRepository } from '@/app/interfaces/repositories/IUser.repository';
import { ErrorMessage } from '@/domain/errors/ErrorMessage';
import { userErrorMessages } from '@/domain/errors/userErrorMessages';
import { CreateUserInputBoundary } from './boundaries/CreateUserInputBoundary';

export class CreateUserValidator implements ICreateUserValidator {
	private errorMessages: ErrorMessage[] = [];
	private userRepository: IUserRepository;

	constructor(userRepository: IUserRepository) {
		this.userRepository = userRepository;
	}

	async validate(input: CreateUserInputBoundary): Promise<ErrorMessage[]> {
		if (!input.password) {
			this.errorMessages.push(userErrorMessages.passwordEmpty);
		}
		if (!input.username) {
			this.errorMessages.push(userErrorMessages.usernameEmpty);
		}

		const userFound = await this.userRepository.getByUsername(input.username);
		if (userFound) {
			this.errorMessages.push(userErrorMessages.usernameIsAlreadyInUse);
		}

		return this.errorMessages;
	}
}
