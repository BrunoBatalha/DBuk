import {
	PostControllerFactory,
	ReactPostControllerFactory,
	ShowTimelineControllerFactory
} from '@/main/compositionRoot/factories';
import { Router } from 'express';
import expressFileUpload from 'express-fileupload';

export const setUpPostRoutes = (router: Router): void => {
	router.post('/posts', async (req, res) => {
		const buffer = (req.files?.image as expressFileUpload.UploadedFile).data;
		const mimetype = (req.files?.image as expressFileUpload.UploadedFile).mimetype;
		const { statusCode, output } = await PostControllerFactory.create().execute({
			...req.body,
			categoriesIds: req.body.categoriesIds.map
				? req.body.categoriesIds.map((ci: string) => Number(ci))
				: [Number(req.body.categoriesIds)],
			image: {
				buffer,
				contentType: mimetype,
				filename: `${new Date().getTime()}`
			}
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

	router.post('/react-post/:id', async (req, res) => {
		const { statusCode, output } = await ReactPostControllerFactory.create().execute({
			username: req.body.username,
			password: req.body.password,
			postId: Number(req.params.id)
		});
		res.status(statusCode as number);
		res.json(output);
	});
};
