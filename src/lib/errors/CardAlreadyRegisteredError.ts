import { DestinyTCGError } from "./DestinyTCGError";

export class CardAlreadyRegisteredError extends DestinyTCGError 
{
    name: string;
    cardId: string;

    constructor(cardId: string) 
    {
        super(`Card with ID ${cardId} is already registered.`);
        this.name = "CardAlreadyRegisteredError";
        this.cardId = cardId;
    }
}