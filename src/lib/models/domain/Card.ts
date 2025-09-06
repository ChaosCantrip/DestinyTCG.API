import { Set, Rarity } from "@lib/models/domain";
import { CardNotFoundError } from "@lib/models/errors";
import { CardFirestoreData } from "@lib/models/firestore";

export class Card {
    private static readonly _cards = new Map<string, Card>();

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

    // Card registry methods

    register() {
        Card._cards.set(this.id, this);
    }

    static get(id: string): Card | undefined {
        const card = Card._cards.get(id);
        if (!card) {
            throw new CardNotFoundError(id);
        }
        return card;
    }

    // Firestore serialization/deserialization

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
}