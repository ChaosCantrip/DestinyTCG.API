import { Logger } from "../../lib/utils";
import { NextFunction, Request, Response } from "express";
import chalk from "chalk";

export default function LogRequest(req: Request, res: Response, next: NextFunction)
{
    const method = chalk.blue(req.method);
    const url = chalk.cyan(req.url);
    Logger.log(`[Request]  ${method} ${url}`);
    next();
}