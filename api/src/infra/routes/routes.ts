import cors from 'cors';
import express from 'express';
import expressFileUpload from 'express-fileupload';
import { setUpPostRoutes } from './posts.routes';
import { setUpUserRoutes } from './users.routes';
const app = express();
const router = express.Router();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(expressFileUpload({}));

setUpPostRoutes(router);
setUpUserRoutes(router);
app.use(router);

export const routes = {
	startServer: (): void => {
		const port = process.env.PORT;

		app.listen(port, () => {
			// eslint-disable-next-line no-console
			console.log(`[server]: Server is running at http://localhost:${port}`);
		});
	}
};
