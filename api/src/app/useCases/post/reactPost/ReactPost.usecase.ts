import { IReactPostUseCase } from '@/adapters/interfaces/useCases/post/reactPost/IReactPost.usecase';
import { IPostUserReactionRepository } from '@/app/interfaces/repositories/IPostUserReaction.repository';
import { ReactPostInputDto } from './dtos/ReactPostInput.dto';
import { ReactPostValidatorOutput } from './ReactPost.validator';

export class ReactPostUseCase implements IReactPostUseCase {
	private outputDataValidator!: ReactPostValidatorOutput;

	constructor(private postUserReactionRepository: IPostUserReactionRepository) { }

	setOutputDataValidator(output: ReactPostValidatorOutput): void {
		this.outputDataValidator = output;
	}

	async execute(input: ReactPostInputDto): Promise<void> {
		const existsReactionInPost = await this.postUserReactionRepository.exists(
			this.outputDataValidator.userId,
			input.postId
		);

		if (existsReactionInPost) {
			await this.postUserReactionRepository.delete(this.outputDataValidator.userId, input.postId); // reaction -> 1 = like
		} else {
			await this.postUserReactionRepository.create(this.outputDataValidator.userId, input.postId, 1); // reaction -> 1 = like
		}
	}
}
