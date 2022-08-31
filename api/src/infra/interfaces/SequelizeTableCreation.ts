import { Model, ModelStatic, Sequelize } from 'sequelize/types';
import { SequelizeModels } from './SequelizeModel';

export type SequelizeTableCreation = {
	define: (sequelize: Sequelize) => ModelStatic<Model<any, any>>;
	associations: (models: SequelizeModels) => void;
};
