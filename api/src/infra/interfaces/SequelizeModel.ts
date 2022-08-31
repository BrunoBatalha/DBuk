import { Model, ModelStatic } from 'sequelize/types';
import { ModelName } from './ModelName';

export type SequelizeModels = {
	[k in ModelName]: ModelStatic<Model<any, any>>;
};
