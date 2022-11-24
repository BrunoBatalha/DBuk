import { RegisterUseCase } from 'data/usecases';
import { HttpClientAdapter } from 'infra/adapters/HttpClientAdapter';
import { Register } from 'presentation/views/register/register';

export default function RegisterFactory(): JSX.Element {
	const httpClientAdapter = new HttpClientAdapter();
	const usecase = new RegisterUseCase(httpClientAdapter);

	return <Register registerUseCase={usecase} />;
}
