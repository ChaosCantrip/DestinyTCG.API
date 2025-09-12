import { DestinyTCGError } from "./DestinyTCGError";

export class CardNotFoundError extends DestinyTCGError 
{
    name: string;
    cardId: string;

    constructor(cardId: string) 
    {
        super(`Card with ID ${cardId} not found.`);
        this.name = "CardNotFoundError";
        this.cardId = cardId;
    }
}