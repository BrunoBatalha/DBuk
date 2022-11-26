import { Button, Grid, TextField } from '@mui/material';
import { AuthService } from 'infra/services/AuthService';
import { IRegisterUseCase } from 'presentation/interfaces/usecases';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ButtonSx, ContainerSx, InputSx } from './styles';

type Props = {
  registerUseCase: IRegisterUseCase;
};

export function Register({ registerUseCase }: Props): JSX.Element {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function submit(): Promise<void> {
    await registerUseCase.execute({
      username: username,
      password: password
    });

    AuthService.saveCredentials(username, password);
    navigate('/');
  }

  function canSubmit(): boolean {
    return !!(username && password);
  }

  return (
    <Grid container sx={ContainerSx} rowSpacing={4}>
      <Grid item xs={12}>
        <TextField
          label="Username"
          variant="standard"
          sx={InputSx}
          value={username}
          onChange={({ target: { value } }): void => setUsername(value)}
          data-testid="input-username"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Password"
          variant="standard"
          sx={InputSx}
          value={password}
          onChange={({ target: { value } }): void => setPassword(value)}
          data-testid="input-password"
        />
      </Grid>
      <Grid item xs={12}>
        <Button
          sx={ButtonSx}
          variant="contained"
          size="large"
          onClick={submit}
          data-testid="btn-submit"
          disabled={!canSubmit()}
        >
          Confirm
        </Button>
      </Grid>
    </Grid>
  );
}
