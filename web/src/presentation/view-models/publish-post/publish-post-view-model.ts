import { IPublishPostUseCase } from 'presentation/interfaces/usecases/IPublishPostUseCase';
import { PublishPostViewModelReturn } from 'presentation/views/publish-post/IPublishPostViewModel';
import { useState } from 'react';

export function PublishPostViewModel({ publishPostUseCase }: Params): () => PublishPostViewModelReturn {
	const [imagePreSelected, setImagePreSelected] = useState<ImageSelection>(null);
	const [imageCropped, setImageCropped] = useState<ImageSelection>(null);
	const [isOpenDialogCropImage, setIsOpenDialogCropImage] = useState<boolean>(false);

	async function onSubmit(): Promise<void> {
		if (!imageCropped) {
			return;
		}

		await publishPostUseCase.save({
			image: imageCropped.blob,
			categoriesIds: [1, 4]
		});

		setImageCropped(null);
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

	return (): PublishPostViewModelReturn => ({
		onSubmit,
		configureImagePreSelected,
		imagePreSelected,
		isOpenDialogCropImage,
		setIsOpenDialogCropImage,
		imageCropped,
		setImageCropped,
		setImagePreSelected
	});
}

export type ImageSelection = {
	blob: Blob;
	url: string;
} | null;

type Params = {
	publishPostUseCase: IPublishPostUseCase;
};
