import { DataTypes } from 'sequelize';
import { SequelizeTableCreation } from '../interfaces/SequelizeTableCreation';

export const PostUserReactionModel: SequelizeTableCreation = {
	define(sequelize) {
		return sequelize.define(
			'posts_users_reactions',
			{
				userId: {
					primaryKey: true,
					type: DataTypes.NUMBER
				},
				postId: {
					primaryKey: true,
					type: DataTypes.NUMBER
				},
				reactionId: {
					type: DataTypes.NUMBER
				}
			},
			{
				timestamps: false
			}
		);
	},

	associations(models) {
		models.PostUserReactionModel.belongsTo(models.PostModel, {
			foreignKey: 'postId'
		});
		models.PostUserReactionModel.belongsTo(models.UserModel, {
			foreignKey: 'userId'
		});
		models.PostUserReactionModel.belongsTo(models.ReactionModel, {
			foreignKey: 'reactionId'
		});
	}
};
