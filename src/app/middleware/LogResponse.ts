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
        let processingTime: string;
        if (res.locals.apiResponse)
        {
            processingTime = chalk.magenta(`${res.locals.apiResponse.meta.processingTime}ms`);
        }
        else 
        {
            const processingTimeMs = Date.now() - res.locals.startTime;
            processingTime = chalk.magenta(`${processingTimeMs}ms`);
        }
        Logger.log(`[Response] ${method} ${url} - ${status} - ${chalk.cyan(message)} - ${processingTime}`);
    });
    next();
}