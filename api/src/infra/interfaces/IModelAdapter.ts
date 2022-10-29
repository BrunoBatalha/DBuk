import { Transaction } from 'sequelize';
import { ModelAliasAssociation } from './ModelAlias';
import { ModelName } from './ModelName';

export interface IModelAdapter {
	create(object: object, transaction: Transaction, includes?: ModelName[]): Promise<object>;
	findOne(
		where: { [k: string]: string | number },
		includes?: ModelAliasAssociation[],
		transaction?: Transaction
	): Promise<object | null>;
	list(where: { [k: string]: string | number }, includes?: ModelAliasAssociation[]): Promise<object[]>;
	listOrderBy(params: IModelAdapter.ListOrderByParams): Promise<object[]>;
	createMany(object: object[], transaction: Transaction): Promise<void>;
	update(object: object, where: { [k: string]: string | number }, transaction: Transaction): Promise<void>;
	delete(where: { [k: string]: string | number }, transaction: Transaction): Promise<void>;
}

export namespace IModelAdapter {
	export interface ListOrderByParams {
		where?: { [k: string]: string | number }
		order?: { parameter: string, orderBy: 'DESC' | 'ASC' },
		includes?: ModelAliasAssociation[],
		transaction?: Transaction
	}
}