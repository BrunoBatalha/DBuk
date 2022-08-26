import dotenv from 'dotenv';
import { routes } from './src/controllers/routes/routes';
dotenv.config();
routes.startServer();
