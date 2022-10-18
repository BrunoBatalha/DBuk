import { IReactPostUseCase } from '@/adapters/interfaces/useCases/post/reactPost/IReactPost.usecase';
import { IReactPostValidator } from '@/adapters/interfaces/useCases/post/reactPost/IReactPost.validator';
import { IBaseOutputBoundary } from '@/app/useCases/IBaseOutputBoundary';
import { ReactPostInputDto } from '@/app/useCases/post/reactPost/dtos/ReactPostInput.dto';
import { UseCaseManagerLoadManyData } from '@/app/useCases/UseCaseManagerLoadManyData';
import { statusCodes } from '@/infra/statusCodes';

interface IResponse {
	output: any;
	statusCode?: number;
}

type Dependecies = {
	usecase: IReactPostUseCase;
	validator: IReactPostValidator;
};

export class ReactPostController {
	private usecase: IReactPostUseCase;
	private validator: IReactPostValidator;

	constructor(dependencies: Dependecies) {
		this.usecase = dependencies.usecase;
		this.validator = dependencies.validator;
	}

	async execute(input: ReactPostInputDto): Promise<IResponse> {
		try {
			const usecase = new UseCaseManagerLoadManyData(this.usecase, this.validator, input);
			const response = await usecase.execute();
			if (!response.statusCode) {
				response.statusCode = statusCodes.CREATED;
			}

			return this.getResponse(response);
		} catch (error: any) {
			return this.getResponse<unknown>({
				statusCode: statusCodes.INTERNAL_SERVER_ERROR,
				value: error.toString(),
				errorMessages: []
			});
		}
	}

	private getResponse<TOuput>(response: IBaseOutputBoundary<TOuput>): IResponse {
		if (response.errorMessages?.length) {
			return { output: response.errorMessages, statusCode: response.statusCode };
		}

		return { output: response.value, statusCode: response.statusCode };
	}
}
