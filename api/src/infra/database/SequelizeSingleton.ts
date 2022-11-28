import { Sequelize } from 'sequelize';
import { SequelizeModels } from '../interfaces/SequelizeModel';
import { CategoryModel } from '../models/category.model';
import { PostModel } from '../models/post.model';
import { PostCategoryModel } from '../models/postCategory.model';
import { PostUserReactionModel } from '../models/postUserReaction.model';
import { ReactionModel } from '../models/reaction.model';
import { UserModel } from '../models/user.model';

export class SequelizeSingleton {
	private static instance: SequelizeSingleton;
	database!: Sequelize;
	models!: SequelizeModels;

	private constructor() {
		this.initDatabase();
		this.configureModels();
	}

	static getInstance(): SequelizeSingleton {
		if (!SequelizeSingleton.instance) {
			SequelizeSingleton.instance = new SequelizeSingleton();
		}

		return SequelizeSingleton.instance;
	}

	private initDatabase(): void {
		this.database = new Sequelize({
			database: process.env.DB_DATABASE,
			username: process.env.DB_USERNAME,
			password: process.env.DB_PASSWORD,
			host: process.env.DB_HOST,
			port: Number(process.env.DB_PORT),
			dialect: 'mysql',
			// eslint-disable-next-line no-console
			logging: false,
			pool: {
				max: 1,
				maxUses: 1
			}
		});

		this.checkConnection();
	}

	private configureModels(): void {
		this.defineModels(this.database);
		this.associateModels(this.models);
	}

	private defineModels(sequelize: Sequelize): void {
		this.models = {
			UserModel: UserModel.define(sequelize),
			PostModel: PostModel.define(sequelize),
			CategoryModel: CategoryModel.define(sequelize),
			PostCategoryModel: PostCategoryModel.define(sequelize),
			ReactionModel: ReactionModel.define(sequelize),
			PostUserReactionModel: PostUserReactionModel.define(sequelize)
		};
	}

	private associateModels(models: SequelizeModels): void {
		UserModel.associations(models);
		PostModel.associations(models);
		CategoryModel.associations(models);
		PostCategoryModel.associations(models);
		ReactionModel.associations(models);
		PostUserReactionModel.associations(models);
	}

	private async checkConnection(): Promise<void> {
		try {
			await this.database.authenticate();
		} catch (error) {
			console.error('Unable to connect to the database:', error);
		}
	}
}
