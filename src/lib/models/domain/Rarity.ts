import { RarityNotFoundError } from "../errors";

export class Rarity {
    static rarities = new Map<string, Rarity>();

    name: string;

    private constructor(name: string) {
        this.name = name;
    }

    static get(name: string): Rarity {
        const rarity = Rarity.rarities.get(name);
        if (!rarity) {
            throw new RarityNotFoundError(name);
        }
        return rarity;
    }

    static fromFirestore(value: string): Rarity {
        return Rarity.get(value);
    }
}