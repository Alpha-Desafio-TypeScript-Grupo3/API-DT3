import express from "express";
const app = express();
import cookieParser from "cookie-parser";
import router from './routes'
import { config } from "./config";

const host: string = config.HOST;
const port: number = config.PORT;

app.use(express.json());
app.use(cookieParser());

app.use('/api', router);

app.listen(port, () => {
    console.log(`Servidor HTTP iniciado em ${host} na porta: ${port}`);
});

export { app };
