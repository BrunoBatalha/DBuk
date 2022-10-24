import {
	Box,
	Button,
	Checkbox,
	FormControl,
	Grid,
	IconButton,
	InputLabel,
	ListItemText,
	MenuItem,
	OutlinedInput,
	Select
} from '@mui/material';
import { DialogDefault } from 'shared/components/dialog-default/dialog-default';
import { PhotoCameraIcon } from 'shared/icons';
import { CropImage } from '../crop-image/crop-image';
import { styles } from './styles';
import { DependenciesUsePublishPost, usePublishPost } from './usePublishPost';

export function PublishPost(dependecies: DependenciesUsePublishPost): JSX.Element {
	const {
		configureImagePreSelected,
		onSubmit,
		setIsOpenDialogCropImage,
		isOpenDialogCropImage,
		setImagePreSelected,
		setForm,
		form,
		imagePreSelected,
		categories
	} = usePublishPost(dependecies);

	return (
		<Box
			sx={styles.Form}
			component="form"
			onSubmit={(e): void => {
				e.preventDefault();
				onSubmit();
			}}
		>
			<FormControl sx={{ marginTop: 4, marginBottom: 4, width: 300 }}>
				<InputLabel id="input-select-categories">Select category</InputLabel>
				<Select
					labelId="input-select-categories"
					multiple
					value={form.categories}
					onChange={({ target: { value } }) => {
						const categoriesSelected = typeof value === 'string' ? value.split(',') : value;
						setForm((prev) => ({ ...prev, categories: categoriesSelected as number[] }));
					}}
					input={<OutlinedInput label="Select category" />}
					renderValue={(selected) => {
						return categories
							.filter((c) => selected.indexOf(c.id) !== -1)
							.map((c) => c.title)
							.join(', ');
					}}
				>
					{categories.map((c) => (
						<MenuItem key={c.id} value={c.id}>
							<Checkbox checked={form.categories.indexOf(c.id) > -1} />
							<ListItemText primary={c.title} />
						</MenuItem>
					))}
				</Select>
			</FormControl>

			<Grid container alignItems="center">
				<Grid item xs={10}>
					<Button
						sx={{ width: '100%' }}
						variant="contained"
						size="large"
						type="submit"
						disabled={form.imageCropped === null}
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

			<Box component="img" sx={styles.Image} src={form.imageCropped?.url} />

			<DialogDefault
				isOpen={isOpenDialogCropImage}
				onClose={(): void => {
					setIsOpenDialogCropImage(false);
				}}
				onCancel={(): void => {
					setForm((prev) => ({ ...prev, imageCropped: null }));
					setImagePreSelected(null);
					setIsOpenDialogCropImage(false);
				}}
				onConfirm={(): void => {
					setIsOpenDialogCropImage(false);
				}}
			>
				{imagePreSelected && (
					<CropImage
						urlImage={imagePreSelected.url}
						onChangeImage={(img) => setForm((prev) => ({ ...prev, imageCropped: img }))}
					/>
				)}
			</DialogDefault>
		</Box>
	);
}
