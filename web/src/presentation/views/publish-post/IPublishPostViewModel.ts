import { ImageSelection } from 'presentation/view-models/publish-post/publish-post-view-model';

export type IPublishPostViewModel = () => PublishPostViewModelReturn;

export type PublishPostViewModelReturn = {
	onSubmit(): Promise<void>;
	imagePreSelected: ImageSelection;
	imageCropped: ImageSelection;
	configureImagePreSelected(fileList: FileList | null): void;
	isOpenDialogCropImage: boolean;
	setIsOpenDialogCropImage: React.Dispatch<React.SetStateAction<boolean>>;
	setImageCropped: React.Dispatch<React.SetStateAction<ImageSelection>>;
	setImagePreSelected: React.Dispatch<React.SetStateAction<ImageSelection>>;
};
