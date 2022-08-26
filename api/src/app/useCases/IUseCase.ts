import { IErrorMessage } from '../../domain/errors/IErrorMessage';
import { IBaseOutputBoundary } from './IBaseOutputBoundary';

export interface IUseCase<TInput, TOutput> {
	execute: (input: TInput) => Promise<IBaseOutputBoundary<TOutput>>;
	validate: (input: TInput) => Promise<IErrorMessage[]>;
}
