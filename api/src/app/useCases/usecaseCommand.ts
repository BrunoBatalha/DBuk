import { statusCodes } from '../../infra/statusCodes';
import { IValidator } from '../validators/IBaseValidator';
import { IBaseOutputBoundary } from './IBaseOutputBoundary';
import { IUseCase } from './IUseCase';

export const useCaseCommand = async <TInput, TOutput>(
	usecase: IUseCase<TInput, TOutput>,
	validator: IValidator<TInput>,
	input: TInput
): Promise<IBaseOutputBoundary<TOutput>> => {
	const errorMessages = await validator.validate(input);

	if (errorMessages.length) {
		return new Promise((resolve) => {
			resolve({
				errorMessages: errorMessages,
				statusCode: statusCodes.BAD_REQUEST
			});
		});
	}

	const output = await usecase.execute(input);

	return new Promise((resolve) => {
		resolve({
			statusCode: statusCodes.CREATED,
			errorMessages: errorMessages,
			value: output
		});
	});
};
