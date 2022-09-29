import { AuthService } from 'infra/services/AuthService';
import { IRegisterUseCase } from 'presentation/interfaces/usecases/IRegisterUseCaseUseCase';
import { RegisterViewModelReturn } from 'presentation/views/register/IRegisterViewModel';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function RegisterViewModel({ registerUseCase }: Params): () => RegisterViewModelReturn {
	const navigate = useNavigate();

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	async function submit(): Promise<void> {
		await registerUseCase.register({
			username: username,
			password: password
		});

		AuthService.saveCredentials(username, password);
		navigate('/');
	}

	return (): RegisterViewModelReturn => ({
		username,
		setUsername,
		password,
		setPassword,
		submit
	});
}

type Params = {
	registerUseCase: IRegisterUseCase;
};
