import { APIResponse } from "../../lib/models/responses";
import { Logger } from "../../lib/utils";
import { NextFunction, Request, Response } from "express";
import { Errors } from "../../lib";

export default function ErrorHandler(err: Error, req: Request, res: Response, next: NextFunction)
{
    if (err instanceof Errors.InvalidRequestBodyError)
    {
        const response = new APIResponse("error", "Invalid request body", { expected_body: err.expected_body });
        res.status(400).send(response);
        return;
    }
    else if (err instanceof Errors.NotYetImplementedError)
    {
        const response = new APIResponse("error", "Endpoint or feature not yet implemented.", null);
        res.status(501).send(response);
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