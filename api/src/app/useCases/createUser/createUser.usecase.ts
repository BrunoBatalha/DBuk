import { IErrorMessage } from '../../../domain/errors/IErrorMessage';
import { userRepository } from '../../../infra/repositories/userRepository';
import { statusCodes } from '../../../infra/statusCodes';
import { baseUseCase } from '../base.usecase';
import { IBaseOutputBoundary } from '../IBaseOutputBoundary';
import { IUseCase } from '../IUseCase';
import { ICreateUserInputBoundary } from './boundaries/ICreateUserInputBoundary';
import { ICreateUserOutputBoundary } from './boundaries/ICreateUserOutputBoundary';

type Output = Promise<IBaseOutputBoundary<ICreateUserOutputBoundary>>;

const errorMessages: IErrorMessage[] = [];
const useCase = (): IUseCase<ICreateUserInputBoundary, ICreateUserOutputBoundary> => {
	return {
		async validate(input): Promise<IErrorMessage[]> {
			if (!input.password) {
				errorMessages.push({
					code: 'err-usr-0001',
					message: 'password required'
				});
			}

			return errorMessages;
		},

		async execute(input): Output {
			await userRepository.create({
				username: input.username,
				password: input.password,
				posts: []
			});

			return new Promise((resolve) => {
				resolve({
					statusCode: statusCodes.CREATED,
					errorMessages: errorMessages,
					value: { username: input.username }
				});
			});
		}
	};
};

export const createUserUseCase = {
	execute: (input: ICreateUserInputBoundary): Output => {
		return baseUseCase(useCase(), input);
	}
};
