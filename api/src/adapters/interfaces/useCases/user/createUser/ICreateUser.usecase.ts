import { IUseCase } from '@/app/useCases/IUseCase';
import { CreateUserInputBoundary } from '@/app/useCases/user/createUser/boundaries/CreateUserInputBoundary';
import { CreateUserOutputBoundary } from '@/app/useCases/user/createUser/boundaries/CreateUserOutputBoundary';

export type ICreateUserUseCase = IUseCase<CreateUserInputBoundary, CreateUserOutputBoundary>;
