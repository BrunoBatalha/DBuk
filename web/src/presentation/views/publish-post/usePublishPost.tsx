import { CategoryDomain } from 'domain/post/CategoryDomain';
import { IListCategoriesUseCase, IPublishPostUseCase } from 'presentation/interfaces/usecases';
import { useEffect, useState } from 'react';

export type DependenciesUsePublishPost = {
	publishPostUseCase: IPublishPostUseCase;
	listCategoriesUseCase: IListCategoriesUseCase;
};

export function usePublishPost({ publishPostUseCase, listCategoriesUseCase }: DependenciesUsePublishPost) {
	const [imagePreSelected, setImagePreSelected] = useState<ImageSelection>(null);
	const [isOpenDialogCropImage, setIsOpenDialogCropImage] = useState<boolean>(false);
	const [categories, setCategories] = useState<CategoryDomain[]>([]);
	const [form, setForm] = useState<FormStatePublishPost>({
		imageCropped: null,
		categories: []
	});

	useEffect(() => {
		loadCategories();
	}, []);

	async function loadCategories() {
		const loadedCategories = await listCategoriesUseCase.execute();
		setCategories(loadedCategories);
	}

	async function onSubmit(): Promise<void> {
		if (!form.imageCropped) {
			return;
		}

		await publishPostUseCase.execute({
			image: form.imageCropped.blob,
			categoriesIds: form.categories
		});

		setForm((prev) => ({ ...prev, imageCropped: null }));
		setImagePreSelected(null);
	}

	function configureImagePreSelected(fileList: FileList | null): void {
		if (!fileList) {
			return;
		}

		setImagePreSelected({
			blob: fileList[0],
			url: URL.createObjectURL(fileList[0])
		});
	}

	return {
		onSubmit,
		configureImagePreSelected,
		imagePreSelected,
		isOpenDialogCropImage,
		setIsOpenDialogCropImage,
		setImagePreSelected,
		categories,
		setForm,
		form
	};
}

export type ImageSelection = {
	blob: Blob;
	url: string;
} | null;

export type FormStatePublishPost = {
	imageCropped: ImageSelection;
	categories: number[];
};
