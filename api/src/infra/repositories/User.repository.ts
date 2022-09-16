import { IUserRepository } from '@/app/interfaces/repositories/IUser.repository';
import { User, UserParams } from '@/domain/entities/User';
import { IDatabaseAdapter } from '../interfaces/IDatabaseAdapter';
import { AbstractRepository } from './AbstractRepository';

export class UserRepository extends AbstractRepository<UserRepository> implements IUserRepository {
	constructor(databaseAdapter: IDatabaseAdapter) {
		super(databaseAdapter);
	}

	async create(user: User): Promise<User> {
		const entity = await this.databaseAdapter.userModel.create(
			{ username: user.username, password: user.password },
			this.transaction
		);
		return User.create(entity as UserParams);
	}

	async getById(userId: number): Promise<User | null | unknown> {
		const data = await this.databaseAdapter.userModel.findOne({ id: userId }, this.includes);
		return data ? User.create(data as UserParams) : null;
	}

	async getByUsername(username: string): Promise<User | null> {
		const data = await this.databaseAdapter.userModel.findOne({ username: username });
		return data ? User.create(data as UserParams) : null;
	}

	async getByUsernamePassword(username: string, password: string): Promise<User | null> {
		const data = await this.databaseAdapter.userModel.findOne({ username: username, password: password });
		return data ? User.create(data as UserParams) : null;
	}

	protected getRepository(): UserRepository {
		return this;
	}
}
