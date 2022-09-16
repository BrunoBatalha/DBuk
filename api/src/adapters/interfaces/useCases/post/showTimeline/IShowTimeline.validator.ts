import { IValidator } from '@/app/useCases/IValidator';
import { ShowTimelineInputDto } from '@/app/useCases/post/showTimeline/dtos/ShowTimelineInput.dto';

export type IShowTimelineValidator = IValidator<ShowTimelineInputDto>;
