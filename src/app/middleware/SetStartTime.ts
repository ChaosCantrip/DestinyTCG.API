import { NextFunction, Request, Response } from "express";

export default function SetStartTime(req: Request, res: Response, next: NextFunction)
{
    res.locals.startTime = new Date();
    next();
}