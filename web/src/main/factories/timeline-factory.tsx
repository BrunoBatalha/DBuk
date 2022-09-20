import { ShowTimelineUseCase } from 'data/usecases/show-timeline/ShowTimelineUseCase';
import { HttpClientAdapter } from 'infra/adapters/HttpClientAdapter';
import { Timeline } from 'presentation/pages/timeline/timeline';

export function TimelineFactory(): JSX.Element {
	const httpClientAdapter = new HttpClientAdapter();
	const showTimelineUseCase = new ShowTimelineUseCase(httpClientAdapter);

	return <Timeline useCase={showTimelineUseCase} />;
}
