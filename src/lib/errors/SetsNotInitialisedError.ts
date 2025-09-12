import { DestinyTCGError } from "./DestinyTCGError";

export class SetsNotInitialisedError extends DestinyTCGError 
{
    name: string;

    constructor() 
    {
        super("Sets have not been initialised.");
        this.name = "SetsNotInitialisedError";
    }
}