import { User } from '@/domain/entities/User';

export interface IUserRepository {
	create(user: User): Promise<User>;
	getById(userId: number, includesOptions?: { includePosts: boolean }): Promise<User | null | unknown>;
	getByUsername(username: string): Promise<User | null>;
	getByUsernamePassword(username: string, password: string): Promise<User | null>;
}
