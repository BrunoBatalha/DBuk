import { AppBar, Box, Button, IconButton, Slide, Toolbar, Typography } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import { TransitionProps } from '@mui/material/transitions';
import React from 'react';
import { CloseIcon } from 'shared/icons';

export function DialogDefault({ children, onCancel, onConfirm, isOpen, onClose }: Props): React.ReactElement {
	return (
		<Dialog
			fullScreen
			open={isOpen}
			onClose={(): void => onClose()}
			TransitionComponent={Transition}
		>
			<AppBar sx={{ position: 'relative' }}>
				<Toolbar>
					<IconButton
						edge="start"
						color="inherit"
						onClick={(): void => {
							onCancel();
						}}
					>
						<CloseIcon />
					</IconButton>

					<Typography
						sx={{ ml: 2, flex: 1 }}
						variant="h6"
						component="div"
					>
						Crop image
					</Typography>

					<Button
						autoFocus
						color="inherit"
						onClick={(): void => onConfirm()}
					>
						save
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
	return (
		<Slide
			direction="up"
			ref={ref}
			{...props}
		/>
	);
});

type Props = {
	onCancel(): void;
	onConfirm(): void;
	isOpen: boolean;
	onClose(): void;
	children: React.ReactNode;
};
