import { Router } from 'express';

export const configurePostRoutes = (router: Router): void => {
	router.get('/posts', (req, res) => {
		res.send('Posts');
	});
};
