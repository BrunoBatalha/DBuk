import { IPublishPostUseCase } from '@/adapters/interfaces/useCases/post/publishPost/IPublishPost.usecase';
import { IManagerTransactions } from '@/app/interfaces/IManagerTransactions';
import { IPostRepository } from '@/app/interfaces/repositories/IPost.repository';
import { IPostCategoryRepository } from '@/app/interfaces/repositories/IPostCategoryRepository';
import { Post } from '@/domain/entities/Post';
import { ImageService } from '@/infra/services/Image.service';
import { PublishPostInputBoundary } from './boundaries/PublishPostInputBoundary';
import { PublishPostOutputBoundary } from './boundaries/PublishPostOutputBoundary';
import { PublishPostValidatorOutput } from './PublishPost.validator';

export class PublishPostUseCase implements IPublishPostUseCase {
	private postRepository: IPostRepository;
	private postCategoryRepository: IPostCategoryRepository;
	private managerTransactions: IManagerTransactions;
	private outputDataValidator!: PublishPostValidatorOutput;

	constructor(
		postRepository: IPostRepository,
		postCategoryRepository: IPostCategoryRepository,
		managerTransactions: IManagerTransactions
	) {
		this.postRepository = postRepository;
		this.postCategoryRepository = postCategoryRepository;
		this.managerTransactions = managerTransactions;
	}

	setOutputDataValidator(output: PublishPostValidatorOutput): void {
		this.outputDataValidator = output;
	}

	async execute(input: PublishPostInputBoundary): Promise<PublishPostOutputBoundary> {
		try {
			await this.managerTransactions.addTransactionTo(this.postRepository);
			await this.managerTransactions.addTransactionTo(this.postCategoryRepository);

			const uriImage = await ImageService.uploadImageToCloud2(input.image);
			const postToCreate = Post.create({
				user: this.outputDataValidator.user,
				imageUri: uriImage,
				createdAt: new Date()
			});

			const entityCreated = await this.postRepository.create(postToCreate);
			await this.postCategoryRepository.create(entityCreated.id as number, input.categoriesIds);

			await this.managerTransactions.confirmTransactions();

			return {
				id: entityCreated.id as number,
				categories: this.outputDataValidator.categories
			} as PublishPostOutputBoundary;
		} catch (error: any) {
			// TODO: fazer rollback para remover arquivo da aws/local caso tenha dado erro
			await this.managerTransactions.undoTransactions();
			throw new Error(error);
		}
	}
}
