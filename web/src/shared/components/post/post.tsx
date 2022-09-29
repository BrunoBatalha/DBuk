import { Box, Divider } from '@mui/material';
import { PostDomain } from 'domain/post/PostDomain';
import { PostActions } from './components/post-actions/post-actions';
import { PostHeader } from './components/post-header/post-header';
import { PostInteractions } from './components/post-interactions/post-interactions';
import { styles } from './styles';

type Props = {
	post: PostDomain;
};

export function Post({ post }: Props): JSX.Element {
	return (
		<>
			<PostHeader publishedDate={post.getPublishedDateToDisplay()} username={post.getUsername()} />

			<Box component="img" sx={styles.Image} className="timeline__image" srcSet={post.image} />

			<PostInteractions totalComments="400" totalReactions="400" />

			<Divider sx={{ margin: (theme) => theme.spacing(2, 0) }} />

			<PostActions />
		</>
	);
}
