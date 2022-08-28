import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';
import { UserModel } from '../models/UserModel';
dotenv.config();

const sequelize = new Sequelize({
	database: process.env.DB_DATABASE,
	username: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	host: process.env.DB_HOST,
	port: Number(process.env.DB_PORT),
	dialect: 'mysql',
	logging: console.log,
	pool: {
		max: 1,
		maxUses: 1
	}
});

export const sequelizeDatabase = {
	UserModel: UserModel(sequelize)
};
