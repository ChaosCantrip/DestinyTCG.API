import express from "express";
import bungieRouter from "./bungie";

const authRouter = express.Router();

authRouter.use("/bungie", bungieRouter);

export default authRouter;