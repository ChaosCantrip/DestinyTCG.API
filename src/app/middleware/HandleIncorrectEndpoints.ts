import { NextFunction, Request, Response } from "express";
import { Errors, Config } from "../../lib";

export default function HandleIncorrectEndpoints(req: Request, res: Response, next: NextFunction)
{
    const match = Config.EndpointsMap.find(endpoint => endpoint.path === req.path);
    if (!match)
    {
        throw new Errors.InvalidEndpointError(req.path);
    }
    if (!match.allowed_methods.includes(req.method as Config.HTTPMethod))
    {
        throw new Errors.MethodNotAllowedError(req.method, req.path, match.allowed_methods);
    }

    next();
}