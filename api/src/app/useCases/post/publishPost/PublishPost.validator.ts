import { IPublishPostUseCase } from '@/adapters/interfaces/useCases/post/publishPost/IPublishPost.usecase';
import { IPublishPostValidator } from '@/adapters/interfaces/useCases/post/publishPost/IPublishPost.validator';
import { ICategoryRepository } from '@/app/interfaces/repositories/ICategory.repository';
import { IUserRepository } from '@/app/interfaces/repositories/IUser.repository';
import { User } from '@/domain/entities/User';
import { categoryErrorMessages } from '@/domain/errors/categoryErrorMessages';
import { ErrorMessage, ErrorMessageManager } from '@/domain/errors/ErrorMessage';
import { userErrorMessages } from '@/domain/errors/userErrorMessages';
import { PublishPostInputBoundary } from './boundaries/PublishPostInputBoundary';

export type PublishPostValidatorOutput = {
	user: User;
};

export class PublishPostValidator implements IPublishPostValidator {
	private errorMessageManager: ErrorMessageManager;
	private output!: PublishPostValidatorOutput;
	private outputPartial: Partial<PublishPostValidatorOutput> = {};
	private input!: PublishPostInputBoundary;

	constructor(private userRepository: IUserRepository, private categoryRepository: ICategoryRepository) {
		this.errorMessageManager = new ErrorMessageManager();
	}

	accept(useCaseVisitor: IPublishPostUseCase): void {
		useCaseVisitor.setOutputDataValidator(this.output);
	}

	async validate(input: PublishPostInputBoundary): Promise<ErrorMessage[]> {
		this.input = input;

		await this.loadData();
		if (this.errorMessageManager.hasError()) {
			return this.errorMessageManager.getList();
		}

		return this.errorMessageManager.getList();
	}

	private async loadData(): Promise<void> {
		await this.validateUser();
		await this.validateCategory();
		if (this.errorMessageManager.hasError()) {
			return;
		}

		this.output = this.outputPartial as PublishPostValidatorOutput;
	}

	private async validateUser(): Promise<void> {
		const userFound = await this.userRepository.getById(this.input.userId);
		if (!userFound) {
			this.errorMessageManager.add(userErrorMessages.userNotFound);
			return;
		}

		this.outputPartial.user = userFound as User;
	}

	private async validateCategory(): Promise<void> {
		const categories = await this.categoryRepository.list();
		const categoriesFound = categories.filter((c) => this.input.categoriesIds.some((id) => id === c.id));

		if (categoriesFound.length != this.input.categoriesIds.length) {
			const idNotFound = this.input.categoriesIds.filter((id) => !categories.some((c) => c.id === id));
			this.errorMessageManager.addWithPlaceholder(categoryErrorMessages.categoryNotFound, {
				id: idNotFound[0]
			});
		}
	}
}
