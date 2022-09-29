import { Box, Button, Grid, IconButton } from '@mui/material';
import { DialogDefault } from 'shared/components/dialog-default/dialog-default';
import { PhotoCameraIcon } from 'shared/icons';
import { CropImage } from '../crop-image/crop-image';
import { IPublishPostViewModel } from './IPublishPostViewModel';
import { styles } from './styles';

type Props = {
	viewModel: IPublishPostViewModel;
};

export function PublishPost({ viewModel }: Props): JSX.Element {
	const {
		configureImagePreSelected,
		onSubmit,
		setIsOpenDialogCropImage,
		isOpenDialogCropImage,
		setImagePreSelected,
		setImageCropped,
		imageCropped,
		imagePreSelected
	} = viewModel();

	return (
		<Box
			sx={styles.Form}
			component="form"
			onSubmit={(e): void => {
				e.preventDefault();
				onSubmit();
			}}
		>
			<Grid container alignItems="center">
				<Grid item xs={10}>
					<Button
						sx={{ width: '100%' }}
						variant="contained"
						size="large"
						type="submit"
						disabled={imageCropped === null}
					>
						Publish
					</Button>
				</Grid>
				<Grid container item xs={2} justifyContent="center" alignItems="center">
					<IconButton color="primary" component="label">
						<input
							hidden
							type="file"
							accept="image/png, image/jpeg"
							onChange={(e): void => {
								configureImagePreSelected(e.target.files);
								setIsOpenDialogCropImage(true);
							}}
						/>
						<PhotoCameraIcon fontSize="large" />
					</IconButton>
				</Grid>
			</Grid>

			<Box component="img" sx={styles.Image} src={imageCropped?.url} />

			<DialogDefault
				isOpen={isOpenDialogCropImage}
				onClose={(): void => {
					setIsOpenDialogCropImage(false);
				}}
				onCancel={(): void => {
					setImageCropped(null);
					setImagePreSelected(null);
					setIsOpenDialogCropImage(false);
				}}
				onConfirm={(): void => {
					setIsOpenDialogCropImage(false);
				}}
			>
				{imagePreSelected && <CropImage urlImage={imagePreSelected.url} onChangeImage={setImageCropped} />}
			</DialogDefault>
		</Box>
	);
}
