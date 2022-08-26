import { Router } from 'express';
import { createUserUseCase } from '../../app/useCases/createUser/createUser.usecase';

export const configureUserRoutes = (router: Router): void => {
	router.post('/users', async (req, res) => {
		const response = await createUserUseCase.execute({
			username: req.body.username,
			password: req.body.password
		});
		res.status(response.statusCode);

		if (response.errorMessages?.length) {
			res.json(response.errorMessages);
			return;
		}

		res.json(response.value);
	});
};
