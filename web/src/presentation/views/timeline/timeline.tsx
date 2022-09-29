import { Box } from '@mui/material';
import { useEffect } from 'react';
import { Post } from 'shared/components/post/post';
import { ITimelineViewModel } from './ITimelineViewModel';

type Props = {
	viewModel: ITimelineViewModel;
};

export function Timeline({ viewModel }: Props): JSX.Element {
	const { getPosts, posts } = viewModel();

	useEffect(() => {
		getPosts();
	}, []);

	return (
		<>
			{posts.map((p) => (
				<Box key={p.id} sx={{ marginTop: (theme) => theme.spacing(4) }}>
					<Post post={p} />
				</Box>
			))}
		</>
	);
}
