import { Logger } from "../../lib/utils";
import { NextFunction, Request, Response } from "express";
import chalk from "chalk";

export default function LogResponse(req: Request, res: Response, next: NextFunction)
{
    const oldSend = res.send;
    const oldUrl = req.url;
    res.send = function (data) 
    {
        Logger.log(`Response: ${chalk.green(res.statusCode)} for ${chalk.blue(req.method)} ${chalk.yellow(oldUrl)}`);
        return oldSend.apply(res, [data]);
    };
    next();
}