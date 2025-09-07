export class SetsNotInitialisedError extends Error 
{
    name: string;

    constructor() 
    {
        super("Sets have not been initialised.");
        this.name = "SetsNotInitialisedError";
    }
}