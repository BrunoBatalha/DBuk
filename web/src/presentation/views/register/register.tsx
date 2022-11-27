import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Box, Button, FormControl, IconButton, Input, InputAdornment, InputLabel, TextField } from '@mui/material';
import { AuthService } from 'infra/services/AuthService';
import { IRegisterUseCase } from 'presentation/interfaces/usecases';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { ButtonSx, ContainerSx, InputSx } from './styles';

type Props = {
  registerUseCase: IRegisterUseCase;
};

export function Register({ registerUseCase }: Props): JSX.Element {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isShowingPassword, setIsShowingPassword] = useState(false);

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

  function handleClickShowPassword() {
    setIsShowingPassword(!isShowingPassword);
  }

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <Box sx={ContainerSx}>
      <TextField
        label={t('username')}
        variant="standard"
        sx={InputSx}
        value={username}
        onChange={({ target: { value } }): void => setUsername(value)}
        data-testid="input-username"
        autoComplete="off"
      />

      <FormControl sx={InputSx} variant="standard">
        <InputLabel htmlFor="password">{t('password')}</InputLabel>
        <Input
          id="password"
          type={isShowingPassword ? 'text' : 'password'}
          value={password}
          onChange={({ target: { value } }): void => setPassword(value)}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
              >
                {isShowingPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>

      <Button
        sx={ButtonSx}
        variant="contained"
        size="large"
        onClick={submit}
        data-testid="btn-submit"
        disabled={!canSubmit()}
      >
        {t('register')}
      </Button>
    </Box>
  );
}
