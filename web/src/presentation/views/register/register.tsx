import { Button, Grid, TextField } from '@mui/material';
import { IRegisterUseCase } from 'presentation/interfaces/usecases';
import { ButtonSx, ContainerSx, InputSx } from './styles';
import { useRegister } from './useRegister';

type Props = {
	registerUseCase: IRegisterUseCase;
};

export function Register({ registerUseCase }: Props): JSX.Element {
	const { password, setPassword, setUsername, submit, username } = useRegister({ registerUseCase });

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
