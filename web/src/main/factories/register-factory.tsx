import { RegisterUseCase } from 'data/usecases/register/RegisterUseCase';
import { HttpClientAdapter } from 'infra/adapters/HttpClientAdapter';
import { RegisterViewModel } from 'presentation/view-models/register/register-view-model';
import { Register } from 'presentation/views/register/register';

export default function RegisterFactory(): JSX.Element {
	const httpClientAdapter = new HttpClientAdapter();
	const usecase = new RegisterUseCase(httpClientAdapter);
	const viewModel = RegisterViewModel({ registerUseCase: usecase });

	return <Register viewModel={viewModel} />;
}
