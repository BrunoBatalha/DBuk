import { ReactionEnum } from 'domain/enums/ReactionEnum';

export type PostDto = {
	id: number;
	image: string;
	user: {
		id: number;
		username: string;
	};
	reaction: ReactionEnum;
	createdAt: Date;
	isReacted: boolean;
	amountReactions: number;
};
