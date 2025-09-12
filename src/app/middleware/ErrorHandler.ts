import { APIResponse } from "../../lib/models/responses";
import { Logger } from "../../lib/utils";
import { NextFunction, Request, Response } from "express";

export default function ErrorHandler(err: Error, req: Request, res: Response, next: NextFunction)
{
    Logger.red("Unhandled error caught in main:");
    Logger.red(err.stack || err.message);
    const response = new APIResponse("error", "Internal Server Error", null);
    res.status(500).send(response);
}