import { ListCategoriesUseCase } from 'data/usecases/ListCategoriesUseCase';
import { PublishPostUseCase } from 'data/usecases/publish-post/PublishPostUseCase';
import { HttpClientAdapter } from 'infra/adapters/HttpClientAdapter';
import { PublishPost } from 'presentation/views/publish-post/publish-post';

export default function PublishPostFactory(): JSX.Element {
	const httpClientAdapter = new HttpClientAdapter();
	const publishPostUseCase = new PublishPostUseCase(httpClientAdapter);
	const listCategoriesUseCase = new ListCategoriesUseCase(httpClientAdapter);

	return <PublishPost listCategoriesUseCase={listCategoriesUseCase} publishPostUseCase={publishPostUseCase} />;
}
