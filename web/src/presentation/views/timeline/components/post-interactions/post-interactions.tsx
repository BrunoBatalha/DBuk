import { Avatar, Box, Grid, Link } from '@mui/material';
import { ThumbUpAltIcon } from 'presentation/components/icons';
import { useTranslation } from 'react-i18next';
import { styles } from './styles';

type Props = {
  totalReactions: number;
  totalComments: string;
};

export function PostInteractions({ totalComments, totalReactions }: Props): JSX.Element {
  const { t } = useTranslation();

  return (
    <Grid container alignItems="center">
      <Grid item container xs={9} alignItems="center">
        <Avatar alt="Reaction liked" sx={styles.IconInGroupLike}>
          <ThumbUpAltIcon sx={styles.IconReactionCount} />
        </Avatar>
        {/* // Favorite icon
				<Avatar alt="Reaction loved" sx={styles.IconInGroupLove}>
					<FavoriteIcon sx={styles.IconReactionCount} />
				</Avatar> 
				*/}
        <Box component="span" sx={{ marginLeft: (theme) => theme.spacing(1) }}>
          {totalReactions}
        </Box>
      </Grid>
      <Grid item container xs={3} justifyContent="flex-end">
        <Link sx={styles.AmountComments} href="#" underline="hover">
          {totalComments} {t('timeline.post.comments')}
        </Link>
      </Grid>
    </Grid>
  );
}
