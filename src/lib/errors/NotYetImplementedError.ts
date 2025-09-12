import { Response } from "express";
import { APIResponse } from "../models/responses";
import { DestinyTCGError } from "./DestinyTCGError";

export class NotYetImplementedError extends DestinyTCGError 
{
    constructor() 
    {
        super("Endpoint or feature not yet implemented.");
        this.name = "NotYetImplementedError";
    }

    handleResponse(res: Response): boolean
    {
        const response = new APIResponse("error", "Endpoint or feature not yet implemented.", null);
        res.status(501).send(response);
        return true;
    }
}