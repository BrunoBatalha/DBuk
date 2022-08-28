import { IErrorMessage } from '../../../domain/errors/IErrorMessage';
import { userErrorMessages } from '../../../domain/errors/userErrorMessages';
import { ICreateUserInputBoundary } from '../../useCases/createUser/boundaries/ICreateUserInputBoundary';
import { IValidator } from '../IBaseValidator';

const createUserValidator = (): IValidator<ICreateUserInputBoundary> => {
	const errorMessages: IErrorMessage[] = [];

	return {
		async validate(input): Promise<IErrorMessage[]> {
			if (!input.password) {
				errorMessages.push(userErrorMessages.passwordEmpty);
			}
			if (!input.username) {
				errorMessages.push(userErrorMessages.usernameEmpty);
			}

			return new Promise((resolve) => {
				resolve(errorMessages);
			});
		}
	};
};

export { createUserValidator };
