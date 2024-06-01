import express from "express";
const app = express();
import cookieParser from "cookie-parser";
import { config } from "./config";
import router from './router'

app.use(express.json());
app.use(cookieParser());

app.use(router);

export { app };
