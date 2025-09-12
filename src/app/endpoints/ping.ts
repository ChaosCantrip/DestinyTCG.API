import express from "express";
import { APIResponse } from "../../lib/models/responses";

export default function PingHandler(req: express.Request, res: express.Response)
{
    const response = new APIResponse("success", "Pong!");
    res.status(200).send(response);
}
