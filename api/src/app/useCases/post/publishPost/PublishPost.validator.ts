import { IPublishPostUseCase } from '@/adapters/interfaces/useCases/post/publishPost/IPublishPost.usecase';
import { IPublishPostValidator } from '@/adapters/interfaces/useCases/post/publishPost/IPublishPost.validator';
import { IAuthenticationValidator } from '@/adapters/interfaces/useCases/user/authentication/IAuthentication.validator';
import { ICategoryRepository } from '@/app/interfaces/repositories/ICategory.repository';
import { Category } from '@/domain/entities/Category';
import { User } from '@/domain/entities/User';
import { categoryErrorMessages } from '@/domain/errors/categoryErrorMessages';
import { ErrorMessageManager } from '@/domain/errors/ErrorMessageManager';
import { statusCodes } from '@/infra/statusCodes';
import { PublishPostInputBoundary } from './boundaries/PublishPostInputBoundary';

export type PublishPostValidatorOutput = {
	user: User;
	categories: Category[];
};

// TODO: validar tipo de arquivo

export class PublishPostValidator implements IPublishPostValidator {
	private errorMessageManager: ErrorMessageManager;
	private output!: PublishPostValidatorOutput;
	private outputPartial: Partial<PublishPostValidatorOutput> = {};
	private input!: PublishPostInputBoundary;

	constructor(
		private validatorAuthentication: IAuthenticationValidator,
		private categoryRepository: ICategoryRepository
	) {
		this.errorMessageManager = new ErrorMessageManager();
	}

	accept(useCaseVisitor: IPublishPostUseCase): void {
		useCaseVisitor.setOutputDataValidator(this.output);
	}

	async validate(input: PublishPostInputBoundary): Promise<ErrorMessageManager> {
		this.input = input;

		await this.loadData();
		if (this.errorMessageManager.hasError()) {
			return this.errorMessageManager;
		}

		return this.errorMessageManager;
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
		const userFound = await this.validatorAuthentication.validateCrendetials(this.input.username, this.input.password);
		if (!userFound) {
			this.errorMessageManager.statusCode = statusCodes.FORBIDDEN;
			return;
		}

		this.outputPartial.user = userFound as unknown as User;
	}

	private async validateCategory(): Promise<void> {
		const categories = await this.categoryRepository.list();
		const categoriesFound = categories.filter((c) => this.input.categoriesIds.some((id) => id === c.id));

		if (categoriesFound.length != this.input.categoriesIds.length) {
			const idNotFound = this.input.categoriesIds.filter((id) => !categories.some((c) => c.id === id));
			this.errorMessageManager.addWithPlaceholder(categoryErrorMessages.categoryNotFound, {
				id: idNotFound[0]
			});
			return;
		}

		this.outputPartial.categories = categoriesFound;
	}
}
