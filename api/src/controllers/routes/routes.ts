import express from 'express';
import { configurePostRoutes } from './posts.routes';
import { configureUserRoutes } from './users.routes';

const app = express();
const router = express.Router();

configurePostRoutes(router);
configureUserRoutes(router);

app.use(express.json());
app.use(router);

export const routes = {
	startServer: (): void => {
		const port = process.env.PORT;

		app.listen(port, () => {
			console.log(`[server]: Server is running at http://localhost:${port}`);
		});
	}
};
