import dotenv from 'dotenv';
import express, { Express, Request, Response } from 'express';
import { cons } from './teste/arq';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.get('/', (req: Request, res: Response) => {
	res.send('Express + TypeScript Server');
});

app.listen(port, () => {
	cons();
	console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
