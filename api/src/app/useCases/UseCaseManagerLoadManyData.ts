import { statusCodes } from '@/infra/statusCodes';
import { IBaseOutputBoundary } from './IBaseOutputBoundary';
import { ISetValidatorOutput } from './ISetValidatorOutput';
import { IUseCase } from './IUseCase';
import { IValidator } from './IValidator';
import { IValidatorOutput } from './IValidatorOutput';

type IUseCaseWithValidatorOutput<TInput, TOutput, TOutputDataValidator> = ISetValidatorOutput<TOutputDataValidator> &
	IUseCase<TInput, TOutput>;
type IValidatorLoadData<TInput, TOutputDataValidator> = IValidator<TInput> & IValidatorOutput<TOutputDataValidator>;

export class UseCaseManagerLoadManyData<TInput, TOutput, TOutputDataValidator> {
	private usecase: IUseCaseWithValidatorOutput<TInput, TOutput, TOutputDataValidator>;
	private validator: IValidatorLoadData<TInput, TOutputDataValidator>;
	private input: TInput;

	constructor(
		usecase: IUseCaseWithValidatorOutput<TInput, TOutput, TOutputDataValidator>,
		validator: IValidatorLoadData<TInput, TOutputDataValidator>,
		input: TInput
	) {
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

		this.validator.accept(this.usecase);

		const output = await this.usecase.execute(this.input);

		return {
			errorMessages: errorMessages,
			value: output
		};
	}
}
