import { Logger } from "../../lib/utils";
import { NextFunction, Request, Response } from "express";
import chalk from "chalk";

export default function LogResponse(req: Request, res: Response, next: NextFunction)
{
    const oldUrl = req.url;
    res.on("finish", () =>
    {
        const method = chalk.blue(req.method);
        const url = chalk.cyan(oldUrl);
        const status = res.statusCode < 400 ? chalk.green(res.statusCode.toString()) : chalk.red(res.statusCode.toString());
        const message = res.locals.apiResponse?.message ? `"${res.locals.apiResponse.message}"` : "";
        Logger.log(`[Response] ${method} ${url} - ${status} - ${chalk.cyan(message)}`);
    });
    next();
}