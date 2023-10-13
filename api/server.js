import cors from "cors";
import express from 'express';
const app = express();

import routes from './routes/index.routes.js';
import { CONFIG } from "./config/config.js";
import morgan from "morgan";

import path from "path"
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
console.log(__dirname)
const __app_dist_dirname = path.join(__dirname, 'public')
console.log(__app_dist_dirname)

// Middleware
app
    .use(cors())
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    // .use(morgan('combined'))
    .use(routes)

app.listen(CONFIG.PORT, () => {
    console.log('/ / / / / / / / / / / / / / / / / / / / / / / / / / / / /')
    console.log(`Servidor en ejecución en el puerto http://localhost:${CONFIG.PORT}`);
    console.log('/ / / / / / / / / / / / / / / / / / / / / / / / / / / / /')
});
