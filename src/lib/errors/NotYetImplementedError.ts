export class NotYetImplementedError extends Error 
{
    constructor() 
    {
        super("Endpoint or feature not yet implemented.");
        this.name = "NotYetImplementedError";
    }
}