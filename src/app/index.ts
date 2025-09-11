import express from "express";
import endpointsRouter from "./endpoints";
import { Manifest } from "../lib/models/domain";
import chalk from "chalk";

const app = express();
const port = process.env.PORT || 3002;

async function initialiseApp()
{
    console.log(chalk.yellow("\n===== Initialising application... ====="));
    await Manifest.initialise();
    console.log(chalk.green("===== Application initialised. ====="));
}

async function main() 
{
    console.log(chalk.yellow("\n===== Starting API server... ====="));

    app.use(express.json());
    app.use("/api", endpointsRouter);

    app.listen(port, () => 
    {
        console.log(chalk.green(`API is running at http://localhost:${port}`));
    });
}

async function start()
{
    await initialiseApp();
    await main();
}

start();