import { CreateUserInputBoundary } from '@/app/useCases/user/createUser/boundaries/CreateUserInputBoundary';
import { IValidator } from '@/app/validators/IValidator';

export type ICreateUserValidator = IValidator<CreateUserInputBoundary>;
