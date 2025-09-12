// #region Imports

import express from "express";
import { Manifest } from "../lib/models/domain";
import { Logger } from "../lib/utils/Logger";
import endpointsRouter from "./endpoints";
import Middleware from "./middleware";
import { MiddlewareConfig, RouterConfig } from "../lib/models/config";

// #endregion


const app = express();
const port = process.env.PORT || 3002;
app.use(express.json());

const middlewares: MiddlewareConfig[] = [
    new MiddlewareConfig("SetStartTime", Middleware.SetStartTime),
    new MiddlewareConfig("LogRequest", Middleware.LogRequest),
    new MiddlewareConfig("LogResponse", Middleware.LogResponse),
    new MiddlewareConfig("ConvertAPIResponse", Middleware.ConvertAPIResponse),
    new MiddlewareConfig("HandleIncorrectEndpoints", Middleware.HandleIncorrectEndpoints)
];

const error_handlers: MiddlewareConfig[] = [
    new MiddlewareConfig("ErrorHandler", Middleware.ErrorHandler),
];

const routers: RouterConfig[] = [
    new RouterConfig("/", endpointsRouter, "endpointsRouter")
];

async function initialiseApp()
{
    Logger.startSection("Initialising Application");

    await Manifest.initialise();

    Logger.startSection("Setting up Middleware");

    middlewares.forEach(middlewareConfig =>
    {
        app.use(middlewareConfig.handler);
        Logger.greenBright(`Middleware ${middlewareConfig.name} configured`);
    });

    Logger.endSection("Middleware Setup Complete");

    Logger.startSection("Setting up Routers");

    routers.forEach((routerConfig) =>
    {
        app.use(routerConfig.route, routerConfig.router);
        Logger.greenBright(`${routerConfig.name} configured at route ${routerConfig.route}`);
    });

    Logger.endSection("Routers Setup Complete");

    Logger.startSection("Setting up Error Handlers");

    error_handlers.forEach(errorHandlerConfig =>
    {
        app.use(errorHandlerConfig.handler);
        Logger.greenBright(`Error Handler ${errorHandlerConfig.name} configured`);
    });

    Logger.endSection("Error Handlers Setup Complete");

    Logger.endSection("Application Initialised");
}

async function main(app: express.Express) 
{
    Logger.startSection("Starting API Server");

    app.listen(port, () => 
    {
        Logger.greenBright(`API Server is running at http://localhost:${port}/api`);
    });
}

async function start()
{
    await initialiseApp();
    await main(app);
}

start();