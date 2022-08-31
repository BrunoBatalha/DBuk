import { ISetValidatorOutput } from '@/app/useCases/ISetValidatorOutput';
import { IUseCase } from '@/app/useCases/IUseCase';
import { PublishPostInputBoundary } from '@/app/useCases/post/publishPost/boundaries/PublishPostInputBoundary';
import { PublishPostOutputBoundary } from '@/app/useCases/post/publishPost/boundaries/PublishPostOutputBoundary';
import { PublishPostValidatorOutput } from '@/app/useCases/post/publishPost/PublishPost.validator';

export type IPublishPostUseCase = IUseCase<PublishPostInputBoundary, PublishPostOutputBoundary> &
	ISetValidatorOutput<PublishPostValidatorOutput>;
