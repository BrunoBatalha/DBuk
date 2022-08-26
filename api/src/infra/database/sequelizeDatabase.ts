import { UserModel } from '../models/UserModel';

// const sequelize = new Sequelize({
// 	database: 'dbuk_db',
// 	dialect: 'mysql',
// 	username: 'root',
// 	password: 'root',
// 	storage: ':memory:'
// });
// sequelize.addModels([UserModel]);

export const sequelizeDatabase = {
	UserModel
};
