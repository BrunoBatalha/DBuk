import { PostControllerFactory } from '@/main/compositionRoot/PostControllerFactory';
import { Router } from 'express';

export const configurePostRoutes = (router: Router): void => {
	router.post('/posts', async (req, res) => {
		const { statusCode, output } = await PostControllerFactory.create().execute(req.body);
		res.status(statusCode as number);
		res.json(output);
	});
};
