import express from "express";

export class RouterConfig 
{
    route: string;
    router: express.Router;
    name: string;

    constructor(route: string, router: express.Router, name: string) 
    {
        this.route = route;
        this.router = router;
        this.name = name;
    }
};