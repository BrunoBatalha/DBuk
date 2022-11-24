import { SxProps, Theme } from '@mui/material';

const Image: SxProps<Theme> = {
	maxHeight: '400px',
	minHeight: '400px',
	margin: (theme) => theme.spacing(3, 'auto'),
	display: 'block'
};

const Form: SxProps<Theme> = {
	height: '100%'
};

export const styles = {
	Image,
	Form
};
