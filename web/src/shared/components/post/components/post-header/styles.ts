import { SxProps, Theme } from '@mui/material';
import { grey } from '@mui/material/colors';

const Avatar: SxProps<Theme> = {
	height: '48px',
	width: '48px'
};

const Username: SxProps<Theme> = {
	fontWeight: (theme) => theme.typography.fontWeightBold,
	marginRight: (theme) => theme.spacing(1),
	color: grey[900]
};

const DatePublished: SxProps<Theme> = {
	color: (theme) => theme.palette.text.secondary,
	fontSize: (theme) => theme.typography.subtitle2
};

export const styles = {
	Avatar,
	Username,
	DatePublished
};
