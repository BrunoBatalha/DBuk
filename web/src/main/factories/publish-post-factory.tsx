import { PublishPostUseCase } from 'data/usecases/publish-post/PublishPostUseCase';
import { HttpClientAdapter } from 'infra/adapters/HttpClientAdapter';
import { PublishPost } from 'presentation/pages/publish-post/publish-post';

export function PublishPostFactory(): JSX.Element {
	const httpClientAdapter = new HttpClientAdapter();
	const usecase = new PublishPostUseCase(httpClientAdapter);

	return <PublishPost useCase={usecase} />;
}
