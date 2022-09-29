import { Paper } from '@mui/material';
import React from 'react';
import { ContainerSx } from './styles';

export function Container({ children }: { children: React.ReactElement }): JSX.Element {
	return (
		<Paper
			variant="outlined"
			sx={ContainerSx}
		>
			{children}
		</Paper>
	);
}
