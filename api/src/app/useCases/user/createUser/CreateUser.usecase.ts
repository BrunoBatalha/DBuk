import { IUserRepository } from '@/app/interfaces/repositories/IUser.repository';
import { User } from '@/domain/entities/User';
import { ICreateUserUseCase } from '../../../../adapters/interfaces/useCases/user/createUser/ICreateUser.usecase';
import { CreateUserInputBoundary } from './boundaries/CreateUserInputBoundary';
import { CreateUserOutputBoundary } from './boundaries/CreateUserOutputBoundary';

export class CreateUserUseCase implements ICreateUserUseCase {
	private userRepository: IUserRepository;

	constructor(userRepository: IUserRepository) {
		this.userRepository = userRepository;
	}

	async execute(input: CreateUserInputBoundary): Promise<CreateUserOutputBoundary> {
		const userToCreate = User.create({
			username: input.username,
			password: input.password,
			posts: []
		});

		const user = await this.userRepository.create(userToCreate);
		return { id: user.id as number, username: user.username };
	}
}
