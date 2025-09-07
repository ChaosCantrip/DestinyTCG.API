import express from "express";
import pingRouter from "./ping";
import cardsRouter from "./cards";
const router = express.Router();

router.use("/ping", pingRouter);
router.use("/cards", cardsRouter);

export default router;