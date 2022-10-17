import { IValidator } from '@/app/useCases/IValidator';
import { IValidatorOutput } from '@/app/useCases/IValidatorOutput';
import { ReactPostInputDto } from '@/app/useCases/post/reactPost/dtos/ReactPostInput.dto';
import { ReactPostValidatorOutput } from '@/app/useCases/post/reactPost/ReactPost.validator';

export type IReactPostValidator = IValidator<ReactPostInputDto> & IValidatorOutput<ReactPostValidatorOutput>;
