import { DataTypes, Model, ModelStatic, Sequelize } from 'sequelize';
import { ModelAliasAssociationEnum } from '../interfaces/ModelAlias';
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
			as: ModelAliasAssociationEnum.posts
		});

		models.UserModel.belongsToMany(models.ReactionModel, {
			through: models.PostUserReactionModel,
			foreignKey: 'userId',
			as: ModelAliasAssociationEnum.reactions
		});
	}
};
