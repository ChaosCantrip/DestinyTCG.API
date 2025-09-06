export class SetAlreadyRegisteredError extends Error 
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