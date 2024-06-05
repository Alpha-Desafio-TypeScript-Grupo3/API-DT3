import express from "express";
const app = express();
import cookieParser from "cookie-parser";
import router from './routes'

app.use(express.json());
app.use(cookieParser());

app.use('/api', router);

export { app };
