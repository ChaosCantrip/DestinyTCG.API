import express from "express";
import startHandler from "./start";
import callbackHandler from "./callback";

const bungieRouter = express.Router();

bungieRouter.get("/start", startHandler);
bungieRouter.get("/callback", callbackHandler);

export default bungieRouter;