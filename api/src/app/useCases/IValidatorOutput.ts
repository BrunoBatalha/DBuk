import { ISetValidatorOutput } from './ISetValidatorOutput';

export interface IValidatorOutput<TOutput> {
	accept(useCaseVisitor: ISetValidatorOutput<TOutput>): void;
}
