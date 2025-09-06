import { Rarity, Set } from "@models/domain";

export class Card {
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

    static fromFirestore(data: any): Card {
        return new Card(
            data.id,
            data.name,
            data.description,
            Set.fromFirestore(data.set),
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