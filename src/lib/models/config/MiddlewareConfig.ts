import express from "express";

export class MiddlewareConfig
{
    name: string;
    handler: express.RequestHandler | express.ErrorRequestHandler;

    constructor(name: string, handler: express.RequestHandler | express.ErrorRequestHandler)
    {
        this.name = name;
        this.handler = handler;
    }
}