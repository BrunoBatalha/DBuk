import { Box, Grid, Slider, Typography } from '@mui/material';
import { useState } from 'react';
import Cropper from 'react-easy-crop';
import { ImageSelection } from '../publish-post/publish-post';
import { useCropImage } from './useCropImage';

type Props = {
	urlImage: string;
	onChangeImage(image: ImageSelection): void;
};

export function CropImage({ urlImage, onChangeImage }: Props): JSX.Element {
	const [crop, setCrop] = useState({ x: 0, y: 0 });
	const [zoom, setZoom] = useState<number>(1);
	const cropImage = useCropImage({ urlImage, onChangeImage });

	return (
		<div>
			<Box sx={{ position: 'relative', height: '400px' }}>
				<Cropper
					image={urlImage}
					crop={crop}
					rotation={cropImage.rotation}
					zoom={zoom}
					aspect={4 / 4}
					onCropChange={setCrop}
					onRotationChange={cropImage.setRotation}
					onCropComplete={cropImage.onCropComplete}
					onZoomChange={setZoom}
				/>
			</Box>
			<Grid container>
				<Grid item xs={12}>
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
				<Grid item xs={12}>
					<Typography variant="overline">Rotation</Typography>
					<Slider
						value={cropImage.rotation}
						min={0}
						max={360}
						step={1}
						aria-labelledby="Rotation"
						onChange={(_, rotation): void => cropImage.setRotation(rotation as number)}
					/>
				</Grid>
			</Grid>
		</div>
	);
}
