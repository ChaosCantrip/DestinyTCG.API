import { Set, Rarity } from "@lib/models/domain";
import { CardNotFoundError } from "@lib/models/errors";

export class Card {
    public static readonly Cards = new Map<string, Card>();

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
        Card.Cards.set(this.id, this);
    }

    static get(id: string): Card | undefined {
        const card = Card.Cards.get(id);
        if (!card) {
            throw new CardNotFoundError(id);
        }
        return card;
    }

    // Firestore serialization/deserialization

    static fromFirestore(data: any): Card {
        return new Card(
            data.id,
            data.name,
            data.description,
            Set.get(data.set),
            Rarity.get(data.rarity)
        );
    }
}