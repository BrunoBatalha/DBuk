import { Box } from '@mui/material';
import { ReactionEnum } from 'domain/enums/ReactionEnum';
import { PostDomain } from 'domain/post/PostDomain';
import { IReactPostUseCase } from 'presentation/interfaces/usecases/IReactPostUseCase';
import { IShowTimelineUseCase } from 'presentation/interfaces/usecases/IShowTimelineUseCase';
import { useEffect, useState } from 'react';
import { Post } from 'shared/components/post/post';

type Props = {
	showTimelineUseCase: IShowTimelineUseCase;
	reactPostUseCase: IReactPostUseCase;
};

export function Timeline({ showTimelineUseCase, reactPostUseCase }: Props) {
	const [posts, setPosts] = useState<PostDomain[]>([]);

	async function getPosts() {
		const { list } = await showTimelineUseCase.execute();
		setPosts(list);
	}

	async function reactPost(postId: number) {
		await reactPostUseCase.execute({ postId: postId });

		const postIndex = posts.findIndex((p) => p.id === postId);

		setPosts((oldPosts) =>
			oldPosts.map((p, i) => {
				if (i !== postIndex) {
					return p;
				}
				p.reaction = p.isReacted() ? null : ReactionEnum.Like;
				return p;
			})
		);
	}

	useEffect(() => {
		getPosts();
	}, []);

	return (
		<>
			{posts.map((p) => (
				<Box key={p.id} sx={{ marginTop: (theme) => theme.spacing(4) }}>
					<Post post={p} onReactPost={reactPost} />
				</Box>
			))}
		</>
	);
}
