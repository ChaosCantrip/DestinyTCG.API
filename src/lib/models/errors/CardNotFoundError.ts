export class CardNotFoundError extends Error {
    name: string;
    cardId: string;

    constructor(cardId: string) {
        super(`Card with ID ${cardId} not found.`);
        this.name = "CardNotFoundError";
        this.cardId = cardId;
    }
}