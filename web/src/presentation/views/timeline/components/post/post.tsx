import { Box, Divider } from '@mui/material';
import { PostDomain } from 'domain/entities';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { PostActions } from '../post-actions/post-actions';
import { PostHeader } from '../post-header/post-header';
import { PostInteractions } from '../post-interactions/post-interactions';
import { styles } from './styles';

type Props = {
  post: PostDomain;
  onReactPost(postId: number): void;
};

export function Post({ post, onReactPost }: Props): JSX.Element {
  return (
    <>
      <PostHeader publishedDate={post.getPublishedDateToDisplay()} username={post.getUsername()} />

      <Box sx={styles.Image}>
        <LazyLoadImage threshold={500} alt={post.getUsername()} src={post.image} width="100%" height="100%" />
      </Box>

      <PostInteractions totalComments="400" totalReactions={post.amountReactions} />

      <Divider sx={{ margin: (theme) => theme.spacing(4, 0) }} />

      <PostActions isReacted={post.isReacted} onReactPost={() => onReactPost(post.id)} />
    </>
  );
}
