import { Router } from "express";
import express from "express";
import CustomRoutes from "./custom.routes.js"


const router = Router();

router
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .use('/api', CustomRoutes)

export default router;