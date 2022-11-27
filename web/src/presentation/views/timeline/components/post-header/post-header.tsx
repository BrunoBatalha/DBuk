import { Avatar, Box, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { styles } from './styles';

type Props = {
  publishedDate: string;
  username: string;
};

export function PostHeader({ publishedDate, username }: Props): JSX.Element {
  const { t } = useTranslation();

  function stringToColor(string: string) {
    let hash = 0;
    for (let i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';
    for (let i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }

    return color;
  }

  function stringAvatar(name: string) {
    return {
      sx: {
        ...styles.Avatar,
        bgcolor: stringToColor(name)
      },
      children: name[0]
    };
  }

  return (
    <Grid container>
      <Grid item container justifyContent="center" xs={2} sm={1}>
        <Avatar alt={username} {...stringAvatar(username)} />
      </Grid>

      <Grid item container xs={9} sm={10}>
        <Grid item xs={12}>
          <Box component="span" sx={styles.Username}>
            {username}
          </Box>
          <Box component="span">{t('timeline.post.published')}</Box>
        </Grid>
        <Grid item>
          <Box component="span" sx={styles.DatePublished}>
            {publishedDate}
          </Box>
        </Grid>
      </Grid>

      <Grid item container xs={1} direction="row" justifyContent="center" alignItems="center">
        {/* <IconButton color="primary">
          <MoreHorizOutlinedIcon />
        </IconButton> */}
      </Grid>
    </Grid>
  );
}
