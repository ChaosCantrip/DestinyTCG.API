import { SetNotFoundError, SetAlreadyRegisteredError } from "@models/errors";
import { SetFirestoreData } from "@models/firestore/SetFirestoreData";
import { getAllSets } from "@/lib/firestore/destinytcg";

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
            console.log("Set collection is already initialised.");
            return;
        }
        console.log("Initialising Set collection...");
        this._sets.clear();
        const setsData = await getAllSets();
        setsData.forEach(setData => 
        {
            const set = Set.fromFirestore(setData);
            set.register();
        });
        console.log(`Initialised Set collection with ${this._sets.size} sets.`);
        this._initialised = true;
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