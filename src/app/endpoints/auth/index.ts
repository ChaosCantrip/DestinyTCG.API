import express from "express";
import bungieRouter from "./bungie";
import refreshHandler from "./refresh";

const authRouter = express.Router();

authRouter.use("/bungie", bungieRouter);
authRouter.post("/refresh", refreshHandler);


export default authRouter;