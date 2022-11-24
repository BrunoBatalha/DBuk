import { AuthService } from 'infra/services/AuthService';
import { IRegisterUseCase } from 'presentation/interfaces/usecases/IRegisterUseCaseUseCase';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

type Params = {
	registerUseCase: IRegisterUseCase;
};

export function useRegister({ registerUseCase }: Params) {
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

	return {
		username,
		setUsername,
		password,
		setPassword,
		submit
	};
}
