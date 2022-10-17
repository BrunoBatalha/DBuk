import { DataTypes } from 'sequelize';
import { SequelizeTableCreation } from '../interfaces/SequelizeTableCreation';

export const ReactionModel: SequelizeTableCreation = {
	define(sequelize) {
		return sequelize.define(
			'reactions',
			{
				id: {
					primaryKey: true,
					type: DataTypes.NUMBER,
					autoIncrement: true
				},
				name: {
					type: DataTypes.ENUM('like')
				}
			},
			{
				timestamps: false
			}
		);
	},

	associations(models) {
		models.ReactionModel.belongsToMany(models.PostModel, {
			through: models.PostUserReactionModel,
			foreignKey: 'postId',
			as: 'posts'
		});
	}
};
