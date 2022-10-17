import { ISetValidatorOutput } from '@/app/useCases/ISetValidatorOutput';
import { IUseCase } from '@/app/useCases/IUseCase';
import { ReactPostInputDto } from '@/app/useCases/post/reactPost/dtos/ReactPostInput.dto';
import { ReactPostValidatorOutput } from '@/app/useCases/post/reactPost/ReactPost.validator';

export type IReactPostUseCase = IUseCase<ReactPostInputDto, void> & ISetValidatorOutput<ReactPostValidatorOutput>;
