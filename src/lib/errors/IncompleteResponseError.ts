export class IncompleteResponseError extends Error
{
    missingPart: string;

    constructor(missingPart: string) 
    {
        super(`Response is missing the following part: ${missingPart}`);
        this.name = "IncompleteResponseError";
        this.missingPart = missingPart;
    }
}