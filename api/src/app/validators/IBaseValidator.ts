import { IErrorMessage } from '../../domain/errors/IErrorMessage';

export interface IValidator<TInput> {
	validate: (input: TInput) => Promise<IErrorMessage[]>;
}
