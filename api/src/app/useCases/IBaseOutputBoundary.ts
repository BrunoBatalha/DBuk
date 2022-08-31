import { ErrorMessage } from '../../domain/errors/ErrorMessage';

export type IBaseOutputBoundary<TOutput> = {
	statusCode?: number;
	errorMessages: ErrorMessage[];
	value?: TOutput;
};
