import { Router } from "express";
import itemRouter from "./routes/item.routes.js";
import authRouter from "./routes/auth.routes.js";

const router = new Router();

router.use("/items", itemRouter);
router.use("/auth", authRouter);

export default router;
