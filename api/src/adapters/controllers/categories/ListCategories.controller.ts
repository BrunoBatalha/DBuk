import { IListCategoriesUseCase } from '@/adapters/interfaces/useCases/category/listCategories/IListCategories.usecase';
import { IListCategoriesValidator } from '@/adapters/interfaces/useCases/category/listCategories/IListCategories.validator';
import { IBaseOutputBoundary } from '@/app/useCases/IBaseOutputBoundary';
import { ListCategoriesInputDto } from '@/app/useCases/post/listCategories';
import { UseCaseManager } from '@/app/useCases/UseCaseManager';
import { statusCodes } from '@/infra/statusCodes';

interface IResponse {
	output: any;
	statusCode?: number;
}

type Dependecies = {
	usecase: IListCategoriesUseCase;
	validator: IListCategoriesValidator;
};

export class ListCategoriesController {
	private usecase: IListCategoriesUseCase;
	private validator: IListCategoriesValidator;

	constructor(dependencies: Dependecies) {
		this.usecase = dependencies.usecase;
		this.validator = dependencies.validator;
	}

	async execute(input: ListCategoriesInputDto): Promise<IResponse> {
		try {
			const usecase = new UseCaseManager(this.usecase, this.validator, input);
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
