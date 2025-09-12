import { NextFunction, Request, Response } from "express";
import { APIResponse } from "../../lib/models/responses";

export default function ConvertAPIResponse(req: Request, res: Response, next: NextFunction)
{
    const oldSend = res.send;
    res.send = function (body: APIResponse<unknown>)
    {
        if (!(body instanceof APIResponse))
        {
            return oldSend.call(this, body);
        }
        res.locals.apiResponse = body;
        body.startTime = res.locals.startTime;
        const newBody = body.toJSON();
        return oldSend.call(this, newBody);
    }
    next();
}