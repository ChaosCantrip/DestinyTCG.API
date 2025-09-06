import { RarityNotFoundError } from "@models/errors";
import { RarityFirestoreData } from "@models/firestore";

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

    // #region Firestore Serialization/Deserialization

    static fromFirestore(data: RarityFirestoreData): Rarity {
        return Rarity.get(data.name);
    }

    toFirestore(): RarityFirestoreData {
        return {
            name: this.name,
        };
    }

    // #endregion
}