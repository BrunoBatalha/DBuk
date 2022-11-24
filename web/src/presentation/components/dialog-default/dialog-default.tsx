import { AppBar, Box, Button, IconButton, Slide, Toolbar, Typography } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import { TransitionProps } from '@mui/material/transitions';
import { CloseIcon } from 'presentation/components/icons';
import React from 'react';

type Props = {
	onCancel(): void;
	onConfirm(): void;
	isOpen: boolean;
	children: React.ReactNode;
};

export function DialogDefault({ children, onCancel, onConfirm, isOpen }: Props): React.ReactElement {
	return (
		<Dialog fullScreen open={isOpen} TransitionComponent={Transition}>
			<AppBar sx={{ position: 'relative' }}>
				<Toolbar>
					<IconButton edge="start" color="inherit" onClick={onCancel}>
						<CloseIcon />
					</IconButton>

					<Typography sx={{ ml: 2, flex: 1 }} variant="h6">
						Crop image
					</Typography>

					<Button autoFocus color="inherit" onClick={onConfirm}>
						Save
					</Button>
				</Toolbar>
			</AppBar>

			<Box sx={{ padding: (theme) => theme.spacing(4) }}>{children}</Box>
		</Dialog>
	);
}

const Transition = React.forwardRef(function Transition(
	props: TransitionProps & {
		children: React.ReactElement;
	},
	ref: React.Ref<unknown>
) {
	return <Slide direction="up" ref={ref} {...props} />;
});
