import { Avatar, Box, Grid, IconButton } from '@mui/material';
import { MoreHorizOutlinedIcon } from 'shared/icons';
import { styles } from './styles';

type Props = {
	publishedDate: string;
	username: string;
};

export function PostHeader({ publishedDate, username }: Props): JSX.Element {
	return (
		<Grid container>
			<Grid item container justifyContent="center" xs={1}>
				<Avatar sx={styles.Avatar} alt={username} src="https://via.placeholder.com/300/000/808080" />
			</Grid>

			<Grid item container xs={10}>
				<Grid item xs={12}>
					<Box component="span" sx={styles.Username}>
						{username}
					</Box>
					<Box component="span">publicou</Box>
				</Grid>
				<Grid item>
					<Box component="span" sx={styles.DatePublished}>
						{publishedDate}
					</Box>
				</Grid>
			</Grid>

			<Grid item container xs={1} direction="row" justifyContent="center" alignItems="center">
				<IconButton color="primary">
					<MoreHorizOutlinedIcon />
				</IconButton>
			</Grid>
		</Grid>
	);
}