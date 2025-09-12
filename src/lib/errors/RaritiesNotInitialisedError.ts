import { DestinyTCGError } from "./DestinyTCGError";

export class RaritiesNotInitialisedError extends DestinyTCGError 
{
    name: string;

    constructor() 
    {
        super("Rarities have not been initialised.");
        this.name = "RaritiesNotInitialisedError";
    }
}