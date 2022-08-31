import { Transaction } from 'sequelize/types';
import { ModelName } from './ModelName';

export interface IModelAdapter {
	create(object: object, transaction: Transaction, includes?: ModelName[]): Promise<object>;
	findOne(where: { [k: string]: string | number }, includes?: ModelName[]): Promise<object | null>;
	list(where: { [k: string]: string | number }, includes?: ModelName[]): Promise<object[]>;
	createMany(object: object[], transaction: Transaction): Promise<void>;
}
