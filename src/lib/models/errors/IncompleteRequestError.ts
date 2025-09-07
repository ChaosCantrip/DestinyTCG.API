export class IncompleteRequestError extends Error
{
    missingParts: string[];

    constructor(missingParts: string[]) 
    {
        super(`Request is missing the following part(s): [${missingParts.join(", ")}]`);
        this.name = "IncompleteRequestError";
        this.missingParts = missingParts;
    }
}