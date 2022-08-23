import { Post } from './Post';

export interface User {
	username: string;
	password: string;
	posts: Post[];
}
