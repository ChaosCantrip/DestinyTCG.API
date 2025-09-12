import { APIResponse } from "../../lib/models/responses";
import { Logger } from "../../lib/utils";
import { NextFunction, Request, Response } from "express";
import { InvalidRequestBodyError } from "../../lib/errors";

export default function ErrorHandler(err: Error, req: Request, res: Response, next: NextFunction)
{
    if (err instanceof InvalidRequestBodyError)
    {
        const response = new APIResponse("error", "Invalid request body", { expected_body: err.expected_body });
        res.status(400).send(response);
        return;
    }
    else
    {
        Logger.red("Unhandled error caught in main:");
        Logger.red(err.stack || err.message);
        const response = new APIResponse("error", "Internal Server Error", null);
        res.status(500).send(response);
    }
}