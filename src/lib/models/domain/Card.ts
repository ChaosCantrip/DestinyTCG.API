import { Set, Rarity } from "@lib/models/domain";
import { CardNotFoundError } from "@lib/models/errors";

export class Card {
    static cards = new Map<string, Card>();

    id: string;
    name: string;
    description: string;
    set: Set;
    rarity: Rarity;

    constructor(id: string, name: string, description: string, set: Set, rarity: Rarity) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.set = set;
        this.rarity = rarity;
    }

    // Card registry methods

    register() {
        Card.cards.set(this.id, this);
    }

    static get(id: string): Card | undefined {
        const card = Card.cards.get(id);
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
            Rarity.fromFirestore(data.rarity)
        );
    }

    toFirestore(): any {
        return {
            id: this.id,
            name: this.name,
            description: this.description,
            set: this.set.toFirestore(),
            rarity: this.rarity.toFirestore(),
        };
    }
}