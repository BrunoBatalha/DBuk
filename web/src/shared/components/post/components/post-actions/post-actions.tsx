import { Button, Grid } from '@mui/material';
import { ChatBubbleOutlineOutlinedIcon, ThumbUpAltIcon, ThumbUpAltOutlinedIcon } from 'shared/icons';

type Props = {
	isReacted: boolean;
	onReactPost(): void;
};

export function PostActions({ isReacted, onReactPost }: Props): JSX.Element {
	const getIconReacted = (): React.ReactNode => {
		if (isReacted) {
			return <ThumbUpAltIcon sx={{ fontSize: '26px' }} />;
		}

		return <ThumbUpAltOutlinedIcon sx={{ fontSize: '26px' }} />;
	};

	return (
		<Grid item container>
			<Button sx={{ flex: 1 }} size="large" startIcon={getIconReacted()} onClick={() => onReactPost()}>
				Like
			</Button>
			<Button sx={{ flex: 1 }} size="large" startIcon={<ChatBubbleOutlineOutlinedIcon sx={{ fontSize: '26px' }} />}>
				Comment
			</Button>
		</Grid>
	);
}
