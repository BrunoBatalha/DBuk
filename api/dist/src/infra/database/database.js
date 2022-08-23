"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.database = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const UserModel_1 = require("../models/UserModel");
const sequelize = new sequelize_typescript_1.Sequelize({
    database: 'dbuk_db',
    dialect: 'mysql',
    username: 'root',
    password: 'root',
    storage: ':memory:'
});
sequelize.addModels([UserModel_1.UserModel]);
exports.database = {
    userDatabase: UserModel_1.UserModel
};
