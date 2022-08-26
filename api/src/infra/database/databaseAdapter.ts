import { sequelizeDatabase } from './sequelizeDatabase';

interface IModel {
	create: (object: object) => Promise<void>;
}

function getModelAdapter(modelClass: keyof typeof sequelizeDatabase): IModel {
	return {
		async create(object): Promise<void> {
			await sequelizeDatabase[modelClass].create({ ...object });
		}
	};
}

export const databaseAdapter = {
	userModel: getModelAdapter('UserModel')
};
