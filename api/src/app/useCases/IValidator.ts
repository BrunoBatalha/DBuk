import { ErrorMessageManager } from '../../domain/errors/ErrorMessageManager';

export interface IValidator<TInput> {
	validate(input: TInput): Promise<ErrorMessageManager>;
}
