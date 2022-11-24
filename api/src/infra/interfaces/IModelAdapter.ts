import { Model, Transaction } from 'sequelize';
import { ModelAliasAssociation } from './ModelAlias';

export interface IModelAdapter {
	create(object: object): Promise<object>;
	findOne(where: { [k: string]: string | number }): Promise<object | null>;
	list(where?: { [k: string]: string | number }): Promise<IModelAdapter.ListOutputEntitiesFinal>;
	createMany(object: object[]): Promise<void>;
	update(object: object, where: { [k: string]: string | number }, transaction: Transaction): Promise<void>;
	delete(where: { [k: string]: string | number }): Promise<void>;

	setLimit(limit: number): IModelAdapter;
	setOffset(offset: number): IModelAdapter;
	setOrderBy(orderBy: 'DESC' | 'ASC'): IModelAdapter;
	setParameterToOrder(parameter: string): IModelAdapter;
	addInclude(includes: ModelAliasAssociation[]): IModelAdapter;
	setTransaction(transaction: Transaction): IModelAdapter;
}

export namespace IModelAdapter {
	export type ListOrderByParams = {
		where?: { [k: string]: string | number };
		order?: { parameter: string; orderBy: 'DESC' | 'ASC' };
		includes?: ModelAliasAssociation[];
		transaction?: Transaction;
	};
	export type ListOutputEntities = {
		list: Array<Model<any, any>>;
		total: number;
	};

	export type ListOutputEntitiesFinal = Omit<ListOutputEntities, 'list'> & {
		list: object[];
	};
}
