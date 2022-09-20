import { DataTypes } from 'sequelize';
import { SequelizeTableCreation } from '../interfaces/SequelizeTableCreation';

export const PostModel: SequelizeTableCreation = {
	define(sequelize) {
		return sequelize.define('posts', {
			id: {
				primaryKey: true,
				type: DataTypes.NUMBER,
				autoIncrement: true
			},
			userId: {
				type: DataTypes.NUMBER
			},
			imageUri: {
				type: DataTypes.STRING,
				allowNull: false
			}
		});
	},

	associations(models) {
		models.PostModel.belongsTo(models.UserModel, {
			foreignKey: 'userId',
			as: 'user'
		});

		models.PostModel.belongsToMany(models.CategoryModel, {
			through: models.PostCategoryModel,
			foreignKey: 'categoryId',
			as: 'categories'
		});
	}
};
