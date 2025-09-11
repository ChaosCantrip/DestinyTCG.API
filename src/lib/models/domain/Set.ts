import { SetNotFoundError, SetAlreadyRegisteredError } from "../errors";
import { SetFirestoreData } from "../firestore";
import { getAllSets } from "../../firestore/destinytcg";
import { Logger, LogLevel } from "../../utils";

export class Set 
{
    private static _sets = new Map<string, Set>();
    private static _initialised = false;

    id: string;
    name: string;

    constructor(id: string, name: string) 
    {
        this.id = id;
        this.name = name;
    }

    // #region Set Collection Management

    static async initialise() 
    {
        if (this._initialised) 
        {
            Logger.yellow("Set collection is already initialised.", LogLevel.WARN);
            return;
        }

        Logger.startSection("Initialising Set Collection");

        this._sets.clear();
        const setsData = await getAllSets();
        setsData.forEach(setData => 
        {
            const set = Set.fromFirestore(setData);
            set.register();
        });
        this._initialised = true;

        Logger.endSection("Set Collection Initialised");
    }

    public static isInitialised(): boolean 
    {
        return this._initialised;
    }

    register() 
    {
        if (Set._sets.has(this.id)) 
        {
            throw new SetAlreadyRegisteredError(this.id);
        }
        Set._sets.set(this.id, this);
    }

    static get(id: string): Set 
    {
        const set = Set._sets.get(id);
        if (!set) 
        {
            throw new SetNotFoundError(id);
        }
        return set;
    }

    // #endregion

    // #region Firestore Serialization/Deserialization

    static fromFirestore(data: SetFirestoreData): Set 
    {
        return new Set(data.id, data.name);
    }

    toFirestore(): SetFirestoreData 
    {
        return {
            id: this.id,
            name: this.name,
        };
    }

    // #endregion
}