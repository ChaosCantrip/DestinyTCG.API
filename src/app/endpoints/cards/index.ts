import express from "express";
import getCardHandler from "./:cardId";
const router = express.Router();

router.use("/:cardId", getCardHandler);

export default router;