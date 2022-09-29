import { PostDomain } from 'domain/post/PostDomain';

export type ITimelineViewModel = () => TimelineViewModelReturn;

export type TimelineViewModelReturn = {
	getPosts: () => Promise<any>;
	posts: PostDomain[];
};
