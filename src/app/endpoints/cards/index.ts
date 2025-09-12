import express from "express";
import getCardHandler from "./getCard";
const router = express.Router();

router.get("/getCard", getCardHandler);

export default router;