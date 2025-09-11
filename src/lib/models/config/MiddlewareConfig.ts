import express from "express";

export class MiddlewareConfig
{
    name: string;
    handler: express.RequestHandler;

    constructor(name: string, handler: express.RequestHandler)
    {
        this.name = name;
        this.handler = handler;
    }
}