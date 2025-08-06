import { Request, Response, Application } from 'express';

import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';

import routes from '@/routes/index';

dotenv.config();

const app: Application = express();
const PORT: string = process.env.PORT ?? "8000";
const rootDir = path.join(process.cwd(), 'public');

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(rootDir, 'css')));
app.use(express.static(path.join(rootDir, 'js')));
app.use(express.static(path.join(rootDir, 'assets', 'svg')));
app.use(express.static(path.join(rootDir, 'assets', 'img')));
app.use(`/api`, routes);

app.get("/", (req: Request, res: Response) => {
  res.sendFile(path.join(rootDir, 'html', 'index.html'));
});

app.get("/login", (req: Request, res: Response) => {
  res.sendFile(path.join(rootDir, 'html', 'login.html'));
})

app.use((req: Request, res: Response) => {
  res.status(404).sendFile(path.join(rootDir, 'html', 'not_found.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
