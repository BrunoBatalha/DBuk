import { PostDomain } from 'domain/post/PostDomain';
import { IShowTimelineUseCase } from 'presentation/interfaces/usecases/IShowTimelineUseCase';
import { TimelineViewModelReturn } from 'presentation/views/timeline/ITimelineViewModel';
import { useState } from 'react';

export function TimelineViewModel({ showTimelineUseCase }: Params): () => TimelineViewModelReturn {
	const [posts, setPosts] = useState<PostDomain[]>([]);

	async function getPosts(): Promise<any> {
		const { list } = await showTimelineUseCase.list();
		setPosts(list);
	}

	return (): TimelineViewModelReturn => ({
		getPosts,
		posts
	});
}

type Params = {
	showTimelineUseCase: IShowTimelineUseCase;
};
