import { Transaction } from 'sequelize/types';
import { ModelAlias } from './ModelAlias';
import { ModelName } from './ModelName';

export interface IModelAdapter {
	create(object: object, transaction: Transaction, includes?: ModelName[]): Promise<object>;
	findOne(where: { [k: string]: string | number }, includes?: ModelAlias[]): Promise<object | null>;
	list(where: { [k: string]: string | number }, includes?: ModelAlias[]): Promise<object[]>;
	createMany(object: object[], transaction: Transaction): Promise<void>;
}
