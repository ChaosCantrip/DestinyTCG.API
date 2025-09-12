import { DestinyTCGError } from "./DestinyTCGError";
import { Response } from "express";
import { APIResponse } from "../models/responses";

export class InvalidEndpointError extends DestinyTCGError 
{
    endpoint: string;

    constructor(endpoint: string)
    {
        super("Invalid endpoint");
        this.name = "InvalidEndpointError";
        this.endpoint = endpoint;
    }

    handleResponse(res: Response): boolean
    {
        const response = new APIResponse("error", "Invalid endpoint", { endpoint: this.endpoint });
        res.status(404).send(response);
        return true;
    }
}