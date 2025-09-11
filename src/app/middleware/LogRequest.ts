import { Logger } from "../../lib/utils";
import { NextFunction, Request, Response } from "express";
import chalk from "chalk";

export default function LogRequest(req: Request, res: Response, next: NextFunction)
{
    Logger.log(`Incoming request: ${chalk.blue(req.method)} ${chalk.yellow(req.url)}`);
    next();
}