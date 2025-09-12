import express from "express";
import cardsRouter from "./cards";
import authRouter from "./auth";
import PingHandler from "./ping";
const router = express.Router();

router.use("/cards", cardsRouter);
router.use("/auth", authRouter);

router.get("/ping", PingHandler);

export default router;