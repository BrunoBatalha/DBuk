import { Button, Grid } from '@mui/material';
import { ChatBubbleOutlineOutlinedIcon, ThumbUpAltIcon, ThumbUpAltOutlinedIcon } from 'presentation/components/icons';
import { useTranslation } from 'react-i18next';

type Props = {
  isReacted: boolean;
  onReactPost(): void;
};

export function PostActions({ isReacted, onReactPost }: Props): JSX.Element {
  const { t } = useTranslation();
  const getIconReacted = (): React.ReactNode => {
    if (isReacted) {
      return <ThumbUpAltIcon sx={{ fontSize: '26px' }} />;
    }

    return <ThumbUpAltOutlinedIcon sx={{ fontSize: '26px' }} />;
  };

  return (
    <Grid item container>
      <Button
        sx={{ flex: 1 }}
        size="large"
        startIcon={getIconReacted()}
        onClick={() => onReactPost()}
        data-testId="btn-like"
      >
        {t('timeline.post.like')}
      </Button>
      <Button sx={{ flex: 1 }} size="large" startIcon={<ChatBubbleOutlineOutlinedIcon sx={{ fontSize: '26px' }} />}>
        {t('timeline.post.comment')}
      </Button>
    </Grid>
  );
}
