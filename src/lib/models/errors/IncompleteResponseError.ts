export class IncompleteResponseError extends Error
{
    constructor(missingPart: string) 
    {
        super(`Response is missing the following part: ${missingPart}`);
        this.name = "IncompleteResponseError";
    }
}