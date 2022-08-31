import { DataTypes, Model, ModelStatic, Sequelize } from 'sequelize';
import { SequelizeModels } from '../interfaces/SequelizeModel';
import { SequelizeTableCreation } from '../interfaces/SequelizeTableCreation';

export const UserModel: SequelizeTableCreation = {
	define(sequelize: Sequelize): ModelStatic<Model<any, any>> {
		return sequelize.define('users', {
			id: {
				primaryKey: true,
				type: DataTypes.NUMBER,
				autoIncrement: true
			},
			username: {
				type: DataTypes.STRING,
				unique: true,
				allowNull: false,
				validate: {
					notEmpty: true
				}
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: true
				}
			}
		});
	},

	associations(models: SequelizeModels): void {
		models.UserModel.hasMany(models.PostModel, {
			as: 'posts'
		});
	}
};
