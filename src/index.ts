import { Request, Response, Application } from 'express';

import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';

import routes from '@/routes/index';

dotenv.config();

const app: Application = express();
const PORT: string = process.env.PORT ?? "8000";

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(`/api`, routes);
app.use(express.static(path.join(__dirname, 'view')));

app.use((req: Request, res: Response) => {
  res.status(404).sendFile(path.join(__dirname, 'view', 'not_found.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
