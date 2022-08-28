import { userRepository } from '../../../infra/repositories/userRepository';
import { createUserValidator } from '../../validators/createUserValidator/createUser.validator';
import { IBaseOutputBoundary } from '../IBaseOutputBoundary';
import { IUseCase } from '../IUseCase';
import { useCaseCommand } from '../usecaseCommand';
import { ICreateUserInputBoundary } from './boundaries/ICreateUserInputBoundary';
import { ICreateUserOutputBoundary } from './boundaries/ICreateUserOutputBoundary';

const useCase = (): IUseCase<ICreateUserInputBoundary, ICreateUserOutputBoundary> => {
	return {
		async execute(input): Promise<ICreateUserOutputBoundary> {
			await userRepository.create({
				username: input.username,
				password: input.password,
				posts: []
			});

			return new Promise((resolve) => {
				resolve({ username: input.username });
			});
		}
	};
};

export const createUserUseCase = {
	execute: (input: ICreateUserInputBoundary): Promise<IBaseOutputBoundary<ICreateUserOutputBoundary>> => {
		return useCaseCommand(useCase(), createUserValidator(), input);
	}
};
