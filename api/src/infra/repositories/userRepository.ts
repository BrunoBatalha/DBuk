import { User } from '../../domain/entities/User';
import { databaseAdapter } from '../database/databaseAdapter';

async function create(user: User): Promise<void> {
	await databaseAdapter.userModel.create({ username: user.username, password: user.password });
}

export const userRepository = {
	create
};
