import { Post } from './Post';

export interface User {
	username: string;
	password: string;
	posts: Post[];
}

/**
 * User.build({username. passowrd}:IUser)
 * e dentro valida os campos pq sao regras de negocio que devem estar na entidade
 */
