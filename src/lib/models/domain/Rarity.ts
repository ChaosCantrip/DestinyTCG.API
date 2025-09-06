import { RarityNotFoundError, RarityAlreadyRegisteredError } from "@models/errors";
import { RarityFirestoreData } from "@models/firestore";
import { getAllRarities } from "@/lib/firestore/destinytcg";

export class Rarity {
    private static readonly _rarities = new Map<string, Rarity>();
    private static _initialised = false;

    public readonly name: string;

    private constructor(name: string) {
        this.name = name;
    }

    // #region Collection Management

    static async initialise() {
        if (this._initialised) {
            console.log("Rarity collection is already initialised.");
            return;
        }
        console.log("Initialising Rarity collection...");
        this._rarities.clear();
        const raritiesData = await getAllRarities();
        raritiesData.forEach(rarityData => {
            const rarity = new Rarity(rarityData.name);
            rarity.register();
        });
        console.log(`Initialised Rarity collection with ${this._rarities.size} rarities.`);
        this._initialised = true;
    }

    public static isInitialised(): boolean {
        return this._initialised;
    }

    register() {
        if (Rarity._rarities.has(this.name)) {
            throw new RarityAlreadyRegisteredError(this.name);
        }
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