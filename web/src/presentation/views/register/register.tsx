import { Button, Grid, TextField } from '@mui/material';
import { IRegisterViewModel } from './IRegisterViewModel';
import { ButtonSx, ContainerSx, InputSx } from './styles';

type Props = {
	viewModel: IRegisterViewModel;
};

export function Register({ viewModel }: Props): JSX.Element {
	const { password, setPassword, setUsername, submit, username } = viewModel();

	return (
		<Grid container sx={ContainerSx} rowSpacing={4}>
			<Grid item xs={12}>
				<TextField
					label="Username"
					variant="standard"
					sx={InputSx}
					value={username}
					onChange={({ target: { value } }): void => setUsername(value)}
				/>
			</Grid>
			<Grid item xs={12}>
				<TextField
					label="Password"
					variant="standard"
					sx={InputSx}
					value={password}
					onChange={({ target: { value } }): void => setPassword(value)}
				/>
			</Grid>
			<Grid item xs={12}>
				<Button sx={ButtonSx} variant="contained" size="large" onClick={submit}>
					Confirm
				</Button>
			</Grid>
		</Grid>
	);
}
