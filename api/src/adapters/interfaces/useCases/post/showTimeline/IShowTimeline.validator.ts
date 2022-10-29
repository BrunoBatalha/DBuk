import { BaseValidatorOutput } from '@/app/useCases/BaseValidatorOutput';
import { IValidator } from '@/app/useCases/IValidator';
import { IValidatorOutput } from '@/app/useCases/IValidatorOutput';
import { ShowTimelineInputDto } from '@/app/useCases/post/showTimeline/dtos/ShowTimelineInput.dto';

export type IShowTimelineValidator = IValidator<ShowTimelineInputDto> & IValidatorOutput<BaseValidatorOutput>;
