import { DestinyTCGError } from "./DestinyTCGError";

export class SetNotFoundError extends DestinyTCGError 
{
    name: string;
    setId: string;

    constructor(setId: string) 
    {
        super(`Set with ID ${setId} not found.`);
        this.name = "SetNotFoundError";
        this.setId = setId;
    }
}