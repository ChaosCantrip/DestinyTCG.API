import { Logger } from "../../lib/utils";
import { NextFunction, Request, Response } from "express";
import chalk from "chalk";

export default function LogResponse(req: Request, res: Response, next: NextFunction)
{
    res.on("finish", () =>
    {
        const method = chalk.blue(req.method);
        const url = chalk.cyan(req.url);
        const status = res.statusCode < 400 ? chalk.green(res.statusCode.toString()) : chalk.red(res.statusCode.toString());
        Logger.log(`[Response] ${method} ${url} - ${status}`);
    });
    next();
}