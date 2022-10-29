import { DataTypes } from 'sequelize';
import { ModelAliasAssociationEnum } from '../interfaces/ModelAlias';
import { SequelizeTableCreation } from '../interfaces/SequelizeTableCreation';

export const ReactionModel: SequelizeTableCreation = {
	define(sequelize) {
		return sequelize.define('reactions', {
			id: {
				primaryKey: true,
				type: DataTypes.NUMBER,
				autoIncrement: true
			},
			title: {
				type: DataTypes.ENUM('like')
			}
		});
	},

	associations(models) {
		models.ReactionModel.belongsToMany(models.PostModel, {
			through: models.PostUserReactionModel,
			foreignKey: 'reactionId',
			as: ModelAliasAssociationEnum.posts
		});
	}
};
