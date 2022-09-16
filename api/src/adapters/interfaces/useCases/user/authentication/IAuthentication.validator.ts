import { User } from '@/domain/entities/User';

export interface IAuthenticationValidator {
	validateCrendetials(username: string, password: string): Promise<User | null>;
}
