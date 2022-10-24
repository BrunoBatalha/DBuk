import { IReactPostUseCase } from '@/adapters/interfaces';
import { IPostUserReactionRepository } from '@/app/interfaces';
import { IManagerTransactions } from '@/app/interfaces/IManagerTransactions';
import { ReactPostInputDto } from './dtos/ReactPostInput.dto';
import { ReactPostValidatorOutput } from './ReactPost.validator';

export class ReactPostUseCase implements IReactPostUseCase {
	private outputDataValidator!: ReactPostValidatorOutput;

	constructor(
		private postUserReactionRepository: IPostUserReactionRepository,
		private managerTransactions: IManagerTransactions
	) { }

	setOutputDataValidator(output: ReactPostValidatorOutput): void {
		this.outputDataValidator = output;
	}

	async execute(input: ReactPostInputDto): Promise<void> {
		try {
			await this.managerTransactions.addTransactionTo(this.postUserReactionRepository);
			const existsReactionInPost = await this.postUserReactionRepository.exists(
				this.outputDataValidator.userId,
				input.postId
			);

			if (existsReactionInPost) {
				await this.postUserReactionRepository.delete(this.outputDataValidator.userId, input.postId); // reaction -> 1 = like
			} else {
				await this.postUserReactionRepository.create(this.outputDataValidator.userId, input.postId, 1); // reaction -> 1 = like
			}

			await this.managerTransactions.confirmTransactions();
		} catch (error: any) {
			// TODO: fazer rollback para remover arquivo da aws/local caso tenha dado erro
			await this.managerTransactions.undoTransactions();
			throw new Error(error);
		}
	}
}
