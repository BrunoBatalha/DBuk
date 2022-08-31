import { IBaseOutputBoundary } from '@/app/useCases/IBaseOutputBoundary';
import { UseCaseManager } from '@/app/useCases/UseCaseManager';
import { CreateUserInputBoundary } from '@/app/useCases/user/createUser/boundaries/CreateUserInputBoundary';
import { CreateUserOutputBoundary } from '@/app/useCases/user/createUser/boundaries/CreateUserOutputBoundary';
import { statusCodes } from '@/infra/statusCodes';
import { ICreateUserUseCase } from '../interfaces/useCases/user/createUser/ICreateUser.usecase';
import { ICreateUserValidator } from '../interfaces/useCases/user/createUser/ICreateUser.validator';

interface IResponse {
	output: any;
	statusCode?: number;
}

type UserControllerDependencies = {
	createUserUseCase: ICreateUserUseCase;
	createUserValidator: ICreateUserValidator;
};

export class UserController {
	private createUserUseCase: ICreateUserUseCase;
	private createUserValidator: ICreateUserValidator;

	constructor(dependencies: UserControllerDependencies) {
		this.createUserUseCase = dependencies.createUserUseCase;
		this.createUserValidator = dependencies.createUserValidator;
	}

	async execute(input: CreateUserInputBoundary): Promise<IResponse> {
		try {
			const usecase = new UseCaseManager(this.createUserUseCase, this.createUserValidator, input);
			const response = await usecase.execute();
			response.statusCode = statusCodes.CREATED;

			return this.getResponse<CreateUserOutputBoundary>(response);
		} catch (error) {
			return this.getResponse<unknown>({
				statusCode: statusCodes.INTERNAL_SERVER_ERROR,
				value: error,
				errorMessages: []
			});
		}
	}

	private getResponse<TOuput>(response: IBaseOutputBoundary<TOuput>): IResponse {
		if (response.errorMessages?.length) {
			return { output: response.errorMessages, statusCode: response.statusCode };
		}

		return { output: response.value, statusCode: response.statusCode };
	}
}
