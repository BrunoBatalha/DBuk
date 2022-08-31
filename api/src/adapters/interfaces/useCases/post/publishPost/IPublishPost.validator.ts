import { IValidator } from '@/app/useCases/IValidator';
import { IValidatorOutput } from '@/app/useCases/IValidatorOutput';
import { PublishPostInputBoundary } from '@/app/useCases/post/publishPost/boundaries/PublishPostInputBoundary';
import { PublishPostValidatorOutput } from '@/app/useCases/post/publishPost/PublishPost.validator';

export type IPublishPostValidator = IValidator<PublishPostInputBoundary> & IValidatorOutput<PublishPostValidatorOutput>;
