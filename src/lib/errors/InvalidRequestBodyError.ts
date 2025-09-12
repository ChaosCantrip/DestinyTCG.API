import { DestinyTCGError } from "./DestinyTCGError";
import { Response } from "express";
import { APIResponse } from "../models/responses";

export class InvalidRequestBodyError extends DestinyTCGError 
{
    expected_body: object;

    constructor(expected_body: object) 
    {
        super("Invalid request body");
        this.name = "InvalidRequestBodyError";
        this.expected_body = expected_body;
    }

    handleResponse(res: Response): boolean
    {
        const response = new APIResponse("error", "Invalid request body", { expected_body: this.expected_body });
        res.status(400).send(response);
        return true;
    }
}