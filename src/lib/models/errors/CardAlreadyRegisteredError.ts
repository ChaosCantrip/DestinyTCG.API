export class CardAlreadyRegisteredError extends Error {
    name: string;
    cardId: string;

    constructor(cardId: string) {
        super(`Card with ID ${cardId} is already registered.`);
        this.name = "CardAlreadyRegisteredError";
        this.cardId = cardId;
    }
}