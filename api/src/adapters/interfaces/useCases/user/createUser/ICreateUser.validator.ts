import { IValidator } from '@/app/useCases/IValidator';
import { CreateUserInputBoundary } from '@/app/useCases/user/createUser/boundaries/CreateUserInputBoundary';

export type ICreateUserValidator = IValidator<CreateUserInputBoundary>;
