import { statusCodes } from '@/infra/statusCodes';
import { IBaseOutputBoundary } from './IBaseOutputBoundary';
import { IUseCase } from './IUseCase';
import { IValidator } from './IValidator';

export class UseCaseManager<TInput, TOutput> {
	private usecase: IUseCase<TInput, TOutput>;
	private validator: IValidator<TInput>;
	private input: TInput;

	constructor(usecase: IUseCase<TInput, TOutput>, validator: IValidator<TInput>, input: TInput) {
		this.usecase = usecase;
		this.validator = validator;
		this.input = input;
	}

	async execute(): Promise<IBaseOutputBoundary<TOutput>> {
		const errorMessages = await this.validator.validate(this.input);
		if (errorMessages.length) {
			return {
				errorMessages: errorMessages,
				statusCode: statusCodes.BAD_REQUEST
			};
		}

		const output = await this.usecase.execute(this.input);

		return {
			errorMessages: errorMessages,
			value: output
		};
	}
}
