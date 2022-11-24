import { useEffect, useState } from 'react';
import { Area } from 'react-easy-crop';
import { ImageSelection } from '../publish-post/publish-post';

type Props = {
	urlImage: string;
	onChangeImage(image: ImageSelection): void;
};

export function useCropImage({ urlImage, onChangeImage }: Props) {
	const [rotation, setRotation] = useState<number>(0);
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

	function onCropComplete(_: Area, croppedAreaPixels: Area) {
		saveCroppedImage(croppedAreaPixels);
	}

	async function saveCroppedImage(croppedAreaPixels: Area) {
		try {
			const newCroppedImage = await getCroppedImg(urlImage, croppedAreaPixels);
			setCroppedImage(newCroppedImage);
		} catch (e) {
			console.error(e);
		}
	}

	function createImage(url: string): Promise<HTMLImageElement> {
		return new Promise((resolve, reject) => {
			const image = new Image();
			image.addEventListener('load', () => resolve(image));
			image.addEventListener('error', (error) => reject(error));
			image.src = url;
		});
	}

	function getRadianAngle(degreeValue: number) {
		return (degreeValue * Math.PI) / 180;
	}

	function getSizesAfterApplyRotation(width: number, height: number, rotation: number) {
		const rotRad = getRadianAngle(rotation);

		return {
			width: Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
			height: Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height)
		};
	}

	async function getCroppedImg(
		imageSrc: string,
		pixelCrop: Area,
		rotation = 0,
		flip = { horizontal: false, vertical: false }
	): Promise<Blob> {
		const image = await createImage(imageSrc);
		const canvas = document.createElement('canvas');
		const ctx = canvas.getContext('2d');

		if (!ctx) {
			throw new Error('ctx is invalid');
		}

		const rotRad = getRadianAngle(rotation);

		// calculate bounding box of the rotated image
		const { width: bBoxWidth, height: bBoxHeight } = getSizesAfterApplyRotation(image.width, image.height, rotation);

		// set canvas size to match the bounding box
		canvas.width = bBoxWidth;
		canvas.height = bBoxHeight;

		// translate canvas context to a central location to allow rotating and flipping around the center
		ctx.translate(bBoxWidth / 2, bBoxHeight / 2);
		ctx.rotate(rotRad);
		ctx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1);
		ctx.translate(-image.width / 2, -image.height / 2);

		// draw rotated image
		ctx.drawImage(image, 0, 0);

		// croppedAreaPixels values are bounding box relative
		// extract the cropped image using these values
		const data = ctx.getImageData(pixelCrop.x, pixelCrop.y, pixelCrop.width, pixelCrop.height);

		// set canvas width to final desired crop size - this will clear existing context
		canvas.width = pixelCrop.width;
		canvas.height = pixelCrop.height;

		// paste generated rotate image at the top left corner
		ctx.putImageData(data, 0, 0);

		// As a blob
		return new Promise((resolve) => {
			canvas.toBlob((file) => {
				if (file) {
					resolve(file);
				}
			}, 'image/png');
		});
	}

	return {
		getCroppedImg,
		onCropComplete,
		setRotation,
		rotation
	};
}
