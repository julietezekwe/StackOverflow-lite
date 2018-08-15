import express from 'express';
import { router } from "./route";
const app  = express();
const baseUrl = '/api/v1/questions';
app.use(express.json());

//routes
app.use(baseUrl, router);

const port = process.env.PORT || 3000;
export const address = app.listen(port, () => console.log(`Listening on port ${port}...`));