import { DestinyTCGError } from "./DestinyTCGError";

export class IncompleteResponseError extends DestinyTCGError
{
    missingPart: string;

    constructor(missingPart: string) 
    {
        super(`Response is missing the following part: ${missingPart}`);
        this.name = "IncompleteResponseError";
        this.missingPart = missingPart;
    }
}