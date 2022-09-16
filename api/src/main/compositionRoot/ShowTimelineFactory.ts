import { ShowTimelineController } from '@/adapters/controllers/post/ShowTimeline.controller';
import { ShowTimelineUseCase } from '@/app/useCases/post/showTimeline/ShowTimeline.usecase';
import { ShowTimelineValidator } from '@/app/useCases/post/showTimeline/ShowTimeline.validator';
import { AuthenticationValidator } from '@/app/useCases/user/authentication/Authentication.validator';
import { DatabaseAdapter } from '@/infra/database/DatabaseAdapter';
import { PostRepository } from '@/infra/repositories/Post.repository';
import { UserRepository } from '@/infra/repositories/User.repository';

export class ShowTimelineControllerFactory {
	static create(): ShowTimelineController {
		const databaseAdapter = new DatabaseAdapter();
		const userRepository = new UserRepository(databaseAdapter);
		const postRepository = new PostRepository(databaseAdapter);
		const usecase = new ShowTimelineUseCase(postRepository);
		const authenticationValidator = new AuthenticationValidator(userRepository);
		const validator = new ShowTimelineValidator(authenticationValidator);

		return new ShowTimelineController({ usecase, validator });
	}
}
