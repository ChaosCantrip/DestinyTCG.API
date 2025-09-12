import { DestinyTCGError } from "./DestinyTCGError";
import { Response } from "express";
import { APIResponse } from "../models/responses";

export class MethodNotAllowedError extends DestinyTCGError 
{
    method: string;
    endpoint: string;
    allowed_methods: string[];

    constructor(method: string, endpoint: string, allowed_methods: string[])
    {
        super("Method not allowed");
        this.name = "MethodNotAllowedError";
        this.method = method;
        this.endpoint = endpoint;
        this.allowed_methods = allowed_methods;
    }

    handleResponse(res: Response): boolean
    {
        const response = new APIResponse("error", "Method not allowed", { method: this.method, allowed_methods: this.allowed_methods });
        res.status(405).send(response);
        return true;
    }
}