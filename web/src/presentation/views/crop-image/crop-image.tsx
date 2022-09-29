import { Box, Grid, Slider, Typography } from '@mui/material';
import { ImageSelection } from 'presentation/view-models/publish-post/publish-post-view-model';
import { useCallback, useEffect, useState } from 'react';
import Cropper, { Area } from 'react-easy-crop';
import getCroppedImg from './crop-image-aux';

type Props = {
	urlImage: string;
	onChangeImage(image: ImageSelection): void;
};

export function CropImage({ urlImage, onChangeImage }: Props): JSX.Element {
	const [crop, setCrop] = useState({ x: 0, y: 0 });
	const [rotation, setRotation] = useState<number>(0);
	const [zoom, setZoom] = useState<number>(1);
	const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
	const [croppedImage, setCroppedImage] = useState<Blob | null>(null);

	useEffect(() => {
		if (!croppedImage) {
			return;
		}

		onChangeImage({
			blob: croppedImage!,
			url: URL.createObjectURL(croppedImage!)
		});
	}, [croppedImage]);

	const onCropComplete = useCallback((_: Area, croppedAreaPixels: Area) => {
		setCroppedAreaPixels(croppedAreaPixels);
		saveCroppedImage(croppedAreaPixels);
	}, []);

	const saveCroppedImage = useCallback(
		async (croppedAreaPixels: Area) => {
			try {
				const newCroppedImage = await getCroppedImg(urlImage, croppedAreaPixels, rotation);
				setCroppedImage(newCroppedImage);
			} catch (e) {
				console.error(e);
			}
		},
		[croppedAreaPixels, rotation]
	);

	return (
		<div>
			<Box sx={{ position: 'relative', height: '400px' }}>
				<Cropper
					image={urlImage}
					crop={crop}
					rotation={rotation}
					zoom={zoom}
					aspect={4 / 4}
					onCropChange={setCrop}
					onRotationChange={setRotation}
					onCropComplete={onCropComplete}
					onZoomChange={setZoom}
				/>
			</Box>
			<Grid container>
				<Grid
					item
					xs={12}
				>
					<Typography variant="overline">Zoom</Typography>
					<Slider
						value={zoom}
						min={1}
						max={3}
						step={0.1}
						aria-labelledby="Zoom"
						onChange={(_, zoom): void => setZoom(zoom as number)}
					/>
				</Grid>
				<Grid
					item
					xs={12}
				>
					<Typography variant="overline">Rotation</Typography>
					<Slider
						value={rotation}
						min={0}
						max={360}
						step={1}
						aria-labelledby="Rotation"
						onChange={(_, rotation): void => setRotation(rotation as number)}
					/>
				</Grid>
			</Grid>
		</div>
	);
}
