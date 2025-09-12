import { APIResponse } from "../../lib/models/responses";
import { Logger } from "../../lib/utils";
import { NextFunction, Request, Response } from "express";
import { Errors } from "../../lib";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function ErrorHandler(err: Error, req: Request, res: Response, next: NextFunction)
{
    if (err instanceof Errors.DestinyTCGError)
    {
        if (err.handleResponse(res))
        {
            return;
        }
    }


    Logger.red("Unhandled error caught in main:");
    Logger.red(err.stack || err.message);
    const response = new APIResponse("error", "Internal Server Error", null);
    res.status(500).send(response);
}