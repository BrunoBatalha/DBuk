import { DataTypes, Model, ModelStatic, Sequelize } from 'sequelize';

export const UserModel = (sequelize: Sequelize): ModelStatic<Model<any, any>> => {
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
};
