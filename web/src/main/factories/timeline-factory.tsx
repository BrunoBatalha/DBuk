import { ShowTimelineUseCase } from 'data/usecases/show-timeline/ShowTimelineUseCase';
import { HttpClientAdapter } from 'infra/adapters/HttpClientAdapter';
import { TimelineViewModel } from 'presentation/view-models/timeline/timeline-view-model';
import { Timeline } from 'presentation/views/timeline/timeline';

export default function TimelineFactory(): JSX.Element {
	const httpClientAdapter = new HttpClientAdapter();
	const showTimelineUseCase = new ShowTimelineUseCase(httpClientAdapter);
	const viewModel = TimelineViewModel({ showTimelineUseCase });

	return <Timeline viewModel={viewModel} />;
}
