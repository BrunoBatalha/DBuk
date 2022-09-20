import { UserControllerFactory } from '@/main/compositionRoot/UserControllerFactory';
import { Router } from 'express';

export const setUpUserRoutes = (router: Router): void => {
	router.post('/users', async (req, res) => {
		const { statusCode, output } = await UserControllerFactory.create().execute(req.body);
		res.status(statusCode as number);
		res.json(output);
	});
};
