export class InvalidFirestoreDataError extends Error
{
    constructor(message: string)
    {
        super(message);
        this.name = "InvalidFirestoreDataError";
    }
}