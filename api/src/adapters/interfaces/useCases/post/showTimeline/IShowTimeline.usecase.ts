import { IUseCase } from '@/app/useCases/IUseCase';
import { ShowTimelineInputDto } from '@/app/useCases/post/showTimeline/dtos/ShowTimelineInput.dto';
import { ShowtimelineOutputDto } from '@/app/useCases/post/showTimeline/dtos/ShowTimelineOutput.dto';

export type IShowTimelineUseCase = IUseCase<ShowTimelineInputDto, ShowtimelineOutputDto>;
