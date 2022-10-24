import { IListCategoriesValidator } from '@/adapters/interfaces/useCases/category/listCategories/IListCategories.validator';
import { IAuthenticationValidator } from '@/adapters/interfaces/useCases/user/authentication/IAuthentication.validator';
import { ErrorMessageManager } from '@/domain/errors/ErrorMessageManager';
import { statusCodes } from '@/infra/statusCodes';
import { ListCategoriesInputDto } from './dtos';

export class ListCategoriesValidator implements IListCategoriesValidator {
	private errorMessageManager: ErrorMessageManager;
	private input!: ListCategoriesInputDto;

	constructor(private validatorAuthentication: IAuthenticationValidator) {
		this.errorMessageManager = new ErrorMessageManager();
	}

	async validate(input: ListCategoriesInputDto): Promise<ErrorMessageManager> {
		this.input = input;

		await this.validateUser();

		return this.errorMessageManager;
	}

	private async validateUser(): Promise<void> {
		const userFound = await this.validatorAuthentication.validateCrendetials(this.input.username, this.input.password);
		if (!userFound) {
			this.errorMessageManager.statusCode = statusCodes.FORBIDDEN;
		}
	}
}
