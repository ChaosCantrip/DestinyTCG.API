import { Set, Rarity } from "@lib/models/domain";
import { CardNotFoundError } from "@lib/models/errors";
import { CardFirestoreData } from "@lib/models/firestore";
import { getAllCards } from "@/lib/firestore/destinytcg";

export class Card {
    private static readonly _cards = new Map<string, Card>();
    private static _initialised = false;

    public readonly id: string;
    public readonly name: string;
    public readonly description: string;
    public readonly set: Set;
    public readonly rarity: Rarity;

    constructor(id: string, name: string, description: string, set: Set, rarity: Rarity) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.set = set;
        this.rarity = rarity;
    }

    // #region Card Collection Management

    static async initialise() {
        if (this._initialised) {
            console.log("Card collection is already initialised.");
            return;
        }
        console.log("Initialising Card collection...");
        this._cards.clear();
        const cardsData = await getAllCards();
        cardsData.forEach(cardData => {
            const card = Card.fromFirestore(cardData);
            card.register();
        });
        console.log(`Initialised Card collection with ${this._cards.size} cards.`);
        this._initialised = true;
    }

    public static isInitialised(): boolean {
        return this._initialised;
    }

    register() {
        Card._cards.set(this.id, this);
    }

    static get(id: string): Card {
        const card = Card._cards.get(id);
        if (!card) {
            throw new CardNotFoundError(id);
        }
        return card;
    }

    // #endregion

    // #region Firestore Serialization/Deserialization

    static fromFirestore(data: CardFirestoreData): Card {
        return new Card(
            data.id,
            data.name,
            data.description,
            Set.get(data.setId),
            Rarity.get(data.rarity)
        );
    }

    toFirestore(): CardFirestoreData {
        return {
            id: this.id,
            name: this.name,
            description: this.description,
            setId: this.set.id,
            rarity: this.rarity.name,
        };
    }

    // #endregion
}