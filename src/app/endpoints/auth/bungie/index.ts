import express from "express";
import startHandler from "./start";

const bungieRouter = express.Router();

bungieRouter.get("/start", startHandler);

export default bungieRouter;