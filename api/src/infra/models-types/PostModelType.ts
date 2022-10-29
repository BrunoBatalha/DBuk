import { UserModelType } from './UserModelType';

export type PostModelType = {
	id: number;
	imageUri: string;
	user: UserModelType;
	createdAt: Date;
	reactions: Array<{
		id: number;
		title: string;
		posts_users_reactions: {
			userId: number;
		};
	}>;
};
