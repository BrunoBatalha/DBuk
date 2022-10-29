import { ModelAliasAssociation } from '../ModelAlias';

export interface IRepositoryIncludes<TRepository> {
	addInclude(modelName: ModelAliasAssociation): TRepository;
	clearIncludes(): TRepository;
}
