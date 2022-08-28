import { ICreateUserInputBoundary } from '../app/useCases/createUser/boundaries/ICreateUserInputBoundary';
import { ICreateUserOutputBoundary } from '../app/useCases/createUser/boundaries/ICreateUserOutputBoundary';
import { createUserUseCase } from '../app/useCases/createUser/createUser.usecase';
import { IBaseOutputBoundary } from '../app/useCases/IBaseOutputBoundary';

function getResponse<TOuput>(response: IBaseOutputBoundary<TOuput>): { output: any; statusCode: number } {
	if (response.errorMessages?.length) {
		return { output: response.errorMessages, statusCode: response.statusCode };
	}
	return { output: response.value, statusCode: response.statusCode };
}

export const userController = {
	async create(dto: ICreateUserInputBoundary): Promise<{ output: any; statusCode: number }> {
		const response = await createUserUseCase.execute({
			username: dto.username,
			password: dto.password
		});

		return getResponse<ICreateUserOutputBoundary>(response);
	}
};
