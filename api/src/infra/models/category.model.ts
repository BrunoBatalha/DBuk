import { DataTypes } from 'sequelize';
import { ModelAliasAssociationEnum } from '../interfaces/ModelAlias';
import { SequelizeTableCreation } from '../interfaces/SequelizeTableCreation';

export const CategoryModel: SequelizeTableCreation = {
	define(sequelize) {
		return sequelize.define('categories', {
			id: {
				primaryKey: true,
				type: DataTypes.NUMBER,
				autoIncrement: true
			},
			title: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					isUppercase: true,
					notEmpty: true
				}
			}
		});
	},
	associations(models) {
		models.CategoryModel.belongsToMany(models.PostModel, {
			through: models.PostCategoryModel,
			foreignKey: 'postId',
			as: ModelAliasAssociationEnum.posts
		});
	}
};
