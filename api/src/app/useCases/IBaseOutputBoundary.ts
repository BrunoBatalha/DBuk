import { IErrorMessage } from '../../domain/errors/IErrorMessage';

export interface IBaseOutputBoundary<TOutput> {
	statusCode: number;
	errorMessages: IErrorMessage[];
	value?: TOutput;
}
