import express from "express";
import pingRouter from "./ping";
const router = express.Router();

router.use("/ping", pingRouter);

export default router;