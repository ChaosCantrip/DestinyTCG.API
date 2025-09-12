import { Response } from "express";

export class DestinyTCGError extends Error
{
    constructor(message: string)
    {
        super(message);
        this.name = "DestinyTCGError";
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    handleResponse(res: Response): boolean
    {
        return false;
    }
}