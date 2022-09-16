import { IAuthenticationValidator } from '@/adapters/interfaces/useCases/user/authentication/IAuthentication.validator';
import { IUserRepository } from '@/app/interfaces/repositories/IUser.repository';
import { User } from '@/domain/entities/User';

export class AuthenticationValidator implements IAuthenticationValidator {
	constructor(private userRepository: IUserRepository) { }

	async validateCrendetials(username: string, password: string): Promise<User | null> {
		return await this.userRepository.getByUsernamePassword(username, password);
	}
}
