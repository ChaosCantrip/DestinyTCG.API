export class InvalidRequestBodyError extends Error 
{
    expected_body: object;

    constructor(expected_body: object) 
    {
        super("Invalid request body");
        this.name = "InvalidRequestBodyError";
        this.expected_body = expected_body;
    }
}