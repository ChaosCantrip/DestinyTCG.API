import express from "express";
import endpointsRouter from "./endpoints";
import "dotenv/config";
import { Manifest } from "../lib/models/domain";

const app = express();
const port = process.env.PORT || 3002;

async function initialiseApp()
{
    console.log("===== Initialising application... =====");
    await Manifest.initialise();
    console.log("===== Application initialised. =====");
}

async function main() 
{
    console.log("===== Starting API server... =====");
    app.use("/api", endpointsRouter);

    app.listen(port, () => 
    {
        console.log(`API is running at http://localhost:${port}`);
    });
}

async function start()
{
    await initialiseApp();
    await main();
}

start();