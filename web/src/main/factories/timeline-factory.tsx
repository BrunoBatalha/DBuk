import { ReactPostUseCase } from 'data/usecases/react-post/ReactPostUseCase';
import { ShowTimelineUseCase } from 'data/usecases/show-timeline/ShowTimelineUseCase';
import { HttpClientAdapter } from 'infra/adapters/HttpClientAdapter';
import { Timeline } from 'presentation/views/timeline/timeline';

export default function TimelineFactory(): JSX.Element {
	const httpClientAdapter = new HttpClientAdapter();
	const showTimelineUseCase = new ShowTimelineUseCase(httpClientAdapter);
	const reactPostUseCase = new ReactPostUseCase(httpClientAdapter);

	return <Timeline showTimelineUseCase={showTimelineUseCase} reactPostUseCase={reactPostUseCase} />;
}
