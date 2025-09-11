import { RarityNotFoundError, RarityAlreadyRegisteredError } from "../../errors";
import { RarityFirestoreData } from "../firestore";
import { getAllRarities } from "../../firestore/destinytcg";
import { Logger, LogLevel } from "../../utils";

export class Rarity 
{
    private static readonly _rarities = new Map<string, Rarity>();
    private static _initialised = false;

    public readonly name: string;

    private constructor(name: string) 
    {
        this.name = name;
    }

    // #region Collection Management

    static async initialise() 
    {
        if (this._initialised) 
        {
            Logger.yellow("Rarity collection is already initialised.", LogLevel.WARN);
            return;
        }

        Logger.startSection("Initialising Rarity Collection");

        this._rarities.clear();
        const raritiesData = await getAllRarities();
        raritiesData.forEach(rarityData => 
        {
            const rarity = new Rarity(rarityData.name);
            rarity.register();
        });
        this._initialised = true;

        Logger.endSection("Rarity Collection Initialised");
    }

    public static isInitialised(): boolean 
    {
        return this._initialised;
    }

    register() 
    {
        if (Rarity._rarities.has(this.name)) 
        {
            throw new RarityAlreadyRegisteredError(this.name);
        }
        Rarity._rarities.set(this.name, this);
    }

    static get(name: string): Rarity 
    {
        const rarity = Rarity._rarities.get(name);
        if (!rarity) 
        {
            throw new RarityNotFoundError(name);
        }
        return rarity;
    }

    // #endregion

    // #region Firestore Serialization/Deserialization

    static fromFirestore(data: RarityFirestoreData): Rarity 
    {
        return Rarity.get(data.name);
    }

    toFirestore(): RarityFirestoreData 
    {
        return {
            name: this.name,
        };
    }

    // #endregion
}