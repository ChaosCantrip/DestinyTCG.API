import { Logger } from "../../lib/utils";
import { NextFunction, Request, Response } from "express";

export default function ErrorHandler(err: Error, req: Request, res: Response, next: NextFunction)
{
    Logger.red("Unhandled error caught in main:");
    Logger.red(err.stack || err.message);
    res.status(500).json({
        success: false,
        message: "Internal Server Error",
        payload: null
    });
}