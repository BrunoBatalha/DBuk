import { ErrorMessage } from '../../domain/errors/ErrorMessageManager';

export type IBaseOutputBoundary<TOutput> = {
	statusCode?: number;
	errorMessages: ErrorMessage[];
	value?: TOutput;
};
