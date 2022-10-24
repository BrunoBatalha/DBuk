import { ListCategoriesControllerFactory } from '@/main/compositionRoot/factories';
import { Router } from 'express';

export const setUpCategoriesRoutes = (router: Router): void => {
	router.get('/categories', async (req, res) => {
		const { statusCode, output } = await ListCategoriesControllerFactory.create().execute({
			username: req.query.username as string,
			password: req.query.password as string
		});
		res.status(statusCode as number);
		res.json(output);
	});
};
