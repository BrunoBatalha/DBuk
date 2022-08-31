import { ErrorMessage } from '../../domain/errors/ErrorMessage';

export interface IValidator<TInput> {
	validate(input: TInput): Promise<ErrorMessage[]>;
}
