import { Request, Response, Application } from 'express';
import express from 'express';

import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import compression from 'compression';
import morgan from 'morgan';

import routes from '@/routes/index';

dotenv.config();

const app: Application = express();
const PORT: string = process.env.PORT ?? "8000";
const root_dir = path.join(process.cwd(), 'public');

app.use(morgan("dev"));
app.use(compression());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve routes
app.use(`/api`, routes);

// Serve static files
app.use(express.static(path.join(root_dir, 'css')));
app.use(express.static(path.join(root_dir, 'js')));
app.use(express.static(path.join(root_dir, 'assets', 'svg')));
app.use(express.static(path.join(root_dir, 'assets', 'img')));

app.get("/", (req: Request, res: Response) => {
    res.sendFile(path.join(root_dir, 'html', 'index.html'));
});

app.get("/login", (req: Request, res: Response) => {
    res.sendFile(path.join(root_dir, 'html', 'login.html'));
})

app.get("/signup", (req: Request, res: Response) => {
    res.sendFile(path.join(root_dir, 'html', 'signup.html'));
});

app.use((req: Request, res: Response) => {
    res.status(404).sendFile(path.join(root_dir, 'html', 'not_found.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export default app;
