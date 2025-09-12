import { DestinyTCGError } from "./DestinyTCGError";

export class IncompleteRequestError extends DestinyTCGError
{
    missingParts: string[];

    constructor(missingParts: string[]) 
    {
        super(`Request is missing the following part(s): [${missingParts.join(", ")}]`);
        this.name = "IncompleteRequestError";
        this.missingParts = missingParts;
    }
}