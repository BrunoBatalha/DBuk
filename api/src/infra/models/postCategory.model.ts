import { DataTypes } from 'sequelize';
import { SequelizeTableCreation } from '../interfaces/SequelizeTableCreation';

export const PostCategoryModel: SequelizeTableCreation = {
	define(sequelize) {
		return sequelize.define(
			'posts_categories',
			{
				id: {
					primaryKey: true,
					type: DataTypes.NUMBER,
					autoIncrement: true
				},
				postId: {
					type: DataTypes.NUMBER
				},
				categoryId: {
					type: DataTypes.NUMBER
				}
			},
			{
				timestamps: false
			}
		);
	},

	associations(models) {
		models.PostCategoryModel.belongsTo(models.PostModel, {
			foreignKey: 'postId'
		});
		models.PostCategoryModel.belongsTo(models.CategoryModel, {
			foreignKey: 'categoryId'
		});
	}
};
