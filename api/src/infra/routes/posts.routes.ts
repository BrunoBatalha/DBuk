import { FileInputDto } from '@/app/useCases/post/publishPost/boundaries/PublishPostInputBoundary';
import { PostControllerFactory } from '@/main/compositionRoot/PostControllerFactory';
import { ShowTimelineControllerFactory } from '@/main/compositionRoot/ShowTimelineFactory';
import { Router } from 'express';
import expressFileUpload from 'express-fileupload';

export const setUpPostRoutes = (router: Router): void => {
	router.post('/posts', async (req, res) => {
		const buffer = (req.files?.image as expressFileUpload.UploadedFile).data;
		const mimetype = (req.files?.image as expressFileUpload.UploadedFile).mimetype;
		const imageDto: FileInputDto = {
			buffer,
			contentType: mimetype,
			filename: `${new Date().getTime()}`
		};

		const { statusCode, output } = await PostControllerFactory.create().execute({
			...req.body,
			categoriesIds: req.body.categoriesIds.map((ci: string) => Number(ci)),
			image: imageDto
		});
		res.status(statusCode as number);
		res.json(output);
	});

	router.get('/posts', async (req, res) => {
		const { statusCode, output } = await ShowTimelineControllerFactory.create().execute({
			username: req.query.username as string,
			password: req.query.password as string
		});
		res.status(statusCode as number);
		res.json(output);
	});
};
