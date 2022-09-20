import { RegisterUseCase } from 'data/usecases/register/RegisterUseCase';
import { HttpClientAdapter } from 'infra/adapters/HttpClientAdapter';
import { Register } from 'presentation/pages/register/register';

export function RegisterFactory(): JSX.Element {
	const httpClientAdapter = new HttpClientAdapter();
	const usecase = new RegisterUseCase(httpClientAdapter);

	return <Register useCase={usecase} />;
}
