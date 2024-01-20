import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser'
import cors from 'cors'

import authRoutes from './routes/auth.routes.js'
import tasksRoutes from './routes/tasks.routes.js'

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
}));
app.use(morgan('dev')); // log requests to the console
app.use(express.json());
app.use(cookieParser());

app.use("/api", authRoutes);
app.use("/api", tasksRoutes);

export default app;