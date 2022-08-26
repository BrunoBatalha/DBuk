import { statusCodes } from '../../infra/statusCodes';
import { IBaseOutputBoundary } from './IBaseOutputBoundary';
import { IUseCase } from './IUseCase';

export const baseUseCase = async <TInput, TOutput>(
	usecase: IUseCase<TInput, TOutput>,
	input: TInput
): Promise<IBaseOutputBoundary<TOutput>> => {
	const errorMessages = await usecase.validate(input);

	if (errorMessages.length) {
		return new Promise((resolve) => {
			resolve({
				errorMessages: errorMessages,
				statusCode: statusCodes.BAD_REQUEST
			});
		});
	}

	return await usecase.execute(input);
};
