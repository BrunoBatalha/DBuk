import { IReactPostUseCase } from '@/adapters/interfaces/useCases/post/reactPost/IReactPost.usecase';
import { IReactPostValidator } from '@/adapters/interfaces/useCases/post/reactPost/IReactPost.validator';
import { IAuthenticationValidator } from '@/adapters/interfaces/useCases/user/authentication/IAuthentication.validator';
import { ErrorMessageManager } from '@/domain/errors/ErrorMessageManager';
import { statusCodes } from '@/infra/statusCodes';
import { ReactPostInputDto } from './dtos/ReactPostInput.dto';

export type ReactPostValidatorOutput = {
	userId: number;
};

// TODO: validar tipo de arquivo

export class ReactPostValidator implements IReactPostValidator {
	private errorMessageManager: ErrorMessageManager;
	private outputPartial: Partial<ReactPostValidatorOutput> = {};
	private input!: ReactPostInputDto;

	constructor(private validatorAuthentication: IAuthenticationValidator) {
		this.errorMessageManager = new ErrorMessageManager();
	}

	accept(useCaseVisitor: IReactPostUseCase): void {
		useCaseVisitor.setOutputDataValidator(this.outputPartial as ReactPostValidatorOutput);
	}

	async validate(input: ReactPostInputDto): Promise<ErrorMessageManager> {
		this.input = input;

		await this.loadData();

		if (this.errorMessageManager.hasError()) {
			return this.errorMessageManager;
		}

		return this.errorMessageManager;
	}

	private async loadData(): Promise<void> {
		await this.validateUser();
	}

	private async validateUser(): Promise<void> {
		const userFound = await this.validatorAuthentication.validateCrendetials(this.input.username, this.input.password);
		if (!userFound) {
			this.errorMessageManager.statusCode = statusCodes.FORBIDDEN;
			return;
		}

		this.outputPartial.userId = userFound.id;
	}
}
