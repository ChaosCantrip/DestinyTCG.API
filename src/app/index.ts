import express from "express";
import endpointsRouter from "./endpoints";
import { Manifest } from "../lib/models/domain";
import { Logger } from "../lib/utils/Logger";
import Middleware from "./middleware";

const app = express();
const port = process.env.PORT || 3002;

async function initialiseApp()
{
    Logger.startSection("Initialising Application");
    await Manifest.initialise();
    Logger.endSection("Application Initialised");
}

async function main() 
{
    Logger.startSection("Starting API Server");

    app.use(express.json());
    app.use(Middleware.LogRequest);
    app.use("/api", endpointsRouter);

    app.listen(port, () => 
    {
        Logger.greenBright(`API Server is running at http://localhost:${port}/api`);
    });
}

async function start()
{
    await initialiseApp();
    await main();
}

start();