import { PostControllerFactory } from '@/main/compositionRoot/PostControllerFactory';
import { ShowTimelineControllerFactory } from '@/main/compositionRoot/ShowTimelineFactory';
import { Router } from 'express';

export const configurePostRoutes = (router: Router): void => {
	router.post('/posts', async (req, res) => {
		const { statusCode, output } = await PostControllerFactory.create().execute(req.body);
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
