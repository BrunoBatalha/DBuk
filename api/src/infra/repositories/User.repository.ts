import { IUserRepository } from '@/app/interfaces/repositories/IUser.repository';
import { User, UserParams } from '@/domain/entities/User';
import { Transaction } from 'sequelize/types';
import { IDatabaseAdapter } from '../interfaces/IDatabaseAdapter';
import { ModelName } from '../interfaces/ModelName';

export class UserRepository implements IUserRepository {
	private databaseAdapter: IDatabaseAdapter;
	private transaction!: Transaction;

	constructor(databaseAdapter: IDatabaseAdapter) {
		this.databaseAdapter = databaseAdapter;
	}

	async create(user: User): Promise<User> {
		const entity = await this.databaseAdapter.userModel.create(
			{ username: user.username, password: user.password },
			this.transaction
		);
		return User.create(entity as UserParams);
	}

	async getById(
		userId: number,
		includesOptions?: { includePosts: boolean } | undefined
	): Promise<User | null | unknown> {
		const includes: ModelName[] = [];

		if (includesOptions?.includePosts) {
			includes.push('PostModel');
		}

		const data = await this.databaseAdapter.userModel.findOne({ id: userId }, includes);
		return data ? User.create(data as UserParams) : null;
	}

	async getByUsername(username: string): Promise<User | null> {
		const data = await this.databaseAdapter.userModel.findOne({ username: username });
		return data ? User.create(data as UserParams) : null;
	}
}
