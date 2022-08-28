import { Router } from 'express';
import { userController } from '../../controllers/user.controller';

export const configureUserRoutes = (router: Router): void => {
	router.post('/users', async (req, res) => {
		const { statusCode, output } = await userController.create(req.body);
		res.status(statusCode);
		res.json(output);
	});
};
