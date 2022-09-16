import { ModelAlias } from '../ModelAlias';

export interface IRepositoryIncludes<TRepository> {
	addInclude(modelName: ModelAlias): TRepository;
	clearIncludes(): TRepository;
}
