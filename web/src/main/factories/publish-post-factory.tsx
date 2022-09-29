import { PublishPostUseCase } from 'data/usecases/publish-post/PublishPostUseCase';
import { HttpClientAdapter } from 'infra/adapters/HttpClientAdapter';
import { PublishPostViewModel } from 'presentation/view-models/publish-post/publish-post-view-model';
import { PublishPost } from 'presentation/views/publish-post/publish-post';

export default function PublishPostFactory(): JSX.Element {
	const httpClientAdapter = new HttpClientAdapter();
	const usecase = new PublishPostUseCase(httpClientAdapter);
	const viewModel = PublishPostViewModel({ publishPostUseCase: usecase });

	return <PublishPost viewModel={viewModel} />;
}
