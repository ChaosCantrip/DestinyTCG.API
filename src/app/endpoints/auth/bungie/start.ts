import express from "express";
import { NotYetImplementedError } from "../../../../lib/errors";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function startHandler(req: express.Request, res: express.Response)
{
    throw new NotYetImplementedError();
}