import { RarityNotFoundError } from "@models/errors";
import { RarityFirestoreData } from "@models/firestore";

export class Rarity {
    private static readonly _rarities = new Map<string, Rarity>();

    public readonly name: string;

    private constructor(name: string) {
        this.name = name;
    }

    // #region Collection Management

    register() {
        Rarity._rarities.set(this.name, this);
    }

    static get(name: string): Rarity {
        const rarity = Rarity._rarities.get(name);
        if (!rarity) {
            throw new RarityNotFoundError(name);
        }
        return rarity;
    }

    // #endregion

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