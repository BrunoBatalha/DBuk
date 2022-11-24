import { SxProps, Theme } from '@mui/material';

const AmountComments: SxProps<Theme> = {
	fontSize: (theme) => theme.typography.subtitle2
};

const iconGroupCommon: SxProps<Theme> = {
	width: (theme) => theme.spacing(8),
	height: (theme) => theme.spacing(8),
	border: (theme) => `2px solid ${theme.palette.common.white}`
};

const IconInGroupLike: SxProps<Theme> = {
	...iconGroupCommon,
	backgroundColor: '#0082FD'
};

const IconInGroupLove: SxProps<Theme> = {
	...iconGroupCommon,
	marginLeft: (theme) => theme.spacing(-2),
	backgroundColor: '#F14538'
};

const IconReactionCount: SxProps<Theme> = {
	fontSize: '20px',
	color: 'white'
};

export const styles = {
	AmountComments,
	IconInGroupLike,
	IconInGroupLove,
	IconReactionCount
};
