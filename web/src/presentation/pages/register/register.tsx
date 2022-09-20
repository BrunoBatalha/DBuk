import { AuthService } from 'infra/services/AuthService';
import { IRegisterUseCase } from 'presentation/interfaces/usecases/IRegisterUseCaseUseCase';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from 'shared/components/container/container';

type Props = {
	useCase: IRegisterUseCase;
};

export function Register({ useCase }: Props): JSX.Element {
	const navigate = useNavigate();

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	async function submit(): Promise<void> {
		await useCase.register({
			username: username,
			password: password
		});

		AuthService.saveCredentials(username, password);
		navigate('/');
	}

	return (
		<Container>
			<input
				type="text"
				onChange={({ target: { value } }): void => {
					setUsername(value);
				}}
			/>
			<input
				type="text"
				onChange={({ target: { value } }): void => {
					setPassword(value);
				}}
			/>
			<button
				onClick={(): void => {
					submit();
				}}
			>
				confirmar
			</button>
		</Container>
	);
}
