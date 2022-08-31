//2 primary key - postId + userId
export type PostReactionUser = {
	postId: number;
	userId: number;
	reactionId: number;
};
