import * as dotenv from 'dotenv';
import { routes } from './src/infra/routes/routes';

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
routes.startServer();
