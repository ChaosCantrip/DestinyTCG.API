import { DestinyTCGError } from "./DestinyTCGError";

export class SetAlreadyRegisteredError extends DestinyTCGError 
{
    name: string;
    setId: string;

    constructor(setId: string) 
    {
        super(`Set with ID ${setId} is already registered.`);
        this.name = "SetAlreadyRegisteredError";
        this.setId = setId;
    }
}