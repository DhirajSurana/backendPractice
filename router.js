import { Router } from "express";
import itemRouter from "./routes/item.routes.js";

const router = new Router();

router.use("/items", itemRouter);

export default router;
