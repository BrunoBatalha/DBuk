import { IUserRepository } from '@/app/interfaces/repositories/IUser.repository';
import { User, UserParams } from '@/domain/entities/User';
import { IDatabaseAdapter } from '../interfaces/IDatabaseAdapter';
import { AbstractRepository } from './AbstractRepository';

export class UserRepository extends AbstractRepository implements IUserRepository {
	constructor(databaseAdapter: IDatabaseAdapter) {
		super(databaseAdapter);
	}

	async create(user: User): Promise<User> {
		const entity = await this.databaseAdapter.userModel
			.setTransaction(this.transaction)
			.create({ username: user.username, password: user.password });

		return User.create(entity as UserParams);
	}

	async getByUsername(username: string): Promise<User | null> {
		const data = await this.databaseAdapter.userModel.findOne({ username: username });
		return data ? User.create(data as UserParams) : null;
	}

	async getByUsernamePassword(username: string, password: string): Promise<User | null> {
		const data = await this.databaseAdapter.userModel.findOne({ username: username, password: password });
		return data ? User.create(data as UserParams) : null;
	}
}
