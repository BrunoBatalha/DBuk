import { SxProps, Theme } from '@mui/material';

const Outlet: SxProps<Theme> = {
	minHeight: 'calc(100vh - 94px)',
	maxHeight: 'calc(100vh - 94px)',
	overflowY: 'scroll'
};

export const styles = { Outlet };
