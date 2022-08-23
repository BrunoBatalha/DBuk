import { User } from '../../domain/entities/User';
import { database } from '../database/database';

export class UserRepository {
	async create(user: User): Promise<void> {
		await database.userDatabase.create({ username: user.username, password: user.password });
	}
}
