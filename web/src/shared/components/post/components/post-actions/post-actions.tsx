import { Button, Grid } from '@mui/material';
import { ChatBubbleOutlineOutlinedIcon, ThumbUpAltOutlinedIcon } from 'shared/icons';

export function PostActions(): JSX.Element {
	return (
		<Grid item container>
			<Button sx={{ flex: 1 }} size="large" startIcon={<ThumbUpAltOutlinedIcon sx={{ fontSize: '26px' }} />}>
				Like
			</Button>
			<Button sx={{ flex: 1 }} size="large" startIcon={<ChatBubbleOutlineOutlinedIcon sx={{ fontSize: '26px' }} />}>
				Comment
			</Button>
		</Grid>
	);
}
