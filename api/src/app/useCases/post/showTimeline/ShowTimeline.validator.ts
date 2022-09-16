import { IShowTimelineValidator } from '@/adapters/interfaces/useCases/post/showTimeline/IShowTimeline.validator';
import { IAuthenticationValidator } from '@/adapters/interfaces/useCases/user/authentication/IAuthentication.validator';
import { ErrorMessageManager } from '@/domain/errors/ErrorMessageManager';
import { statusCodes } from '@/infra/statusCodes';
import { ShowTimelineInputDto } from './dtos/ShowTimelineInput.dto';

export class ShowTimelineValidator implements IShowTimelineValidator {
	private errorMessageManager: ErrorMessageManager;
	private input!: ShowTimelineInputDto;

	constructor(private validatorAuthentication: IAuthenticationValidator) {
		this.errorMessageManager = new ErrorMessageManager();
	}

	async validate(input: ShowTimelineInputDto): Promise<ErrorMessageManager> {
		this.input = input;

		await this.validateUser();
		if (this.errorMessageManager.hasError()) {
			return this.errorMessageManager;
		}

		return this.errorMessageManager;
	}

	private async validateUser(): Promise<void> {
		const userFound = await this.validatorAuthentication.validateCrendetials(this.input.username, this.input.password);
		if (!userFound) {
			this.errorMessageManager.statusCode = statusCodes.FORBIDDEN;
		}
	}
}
