import dotenv from 'dotenv';
import { routes } from './src/infra/routes/routes';
dotenv.config();
routes.startServer();
