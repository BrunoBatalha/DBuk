import dotenv from 'dotenv';
import express, { Express, Request, Response } from 'express';
import { cons } from './src/arq';
import { b } from './src/b';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.get('/', (req: Request, res: Response) => {
	res.send('Express + TypeScript Server');
});

app.listen(port, () => {
	cons();
	b();
	b();
	b();
	console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
