import express from "express";
import pingRouter from "./ping";
import cardsRouter from "./cards";
import authRouter from "./auth";
const router = express.Router();

router.use("/ping", pingRouter);
router.use("/cards", cardsRouter);
router.use("/auth", authRouter);

export default router;