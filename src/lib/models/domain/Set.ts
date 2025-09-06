import { SetNotFoundError } from "@models/errors/SetNotFoundError";
import { SetFirestoreData } from "@models/firestore/SetFirestoreData";
import { getAllSets } from "@/lib/firestore/destinytcg";

export class Set {
    static sets = new Map<string, Set>();

    id: string;
    name: string;

    constructor(id: string, name: string) {
        this.id = id;
        this.name = name;
    }

    // #region Set Collection Management

    static async initialise() {
        console.log("Initialising Set collection...");
        this.sets.clear();
        const setsData = await getAllSets();
        setsData.forEach(setData => {
            const set = Set.fromFirestore(setData);
            set.register();
        });
        console.log(`Initialised Set collection with ${this.sets.size} sets.`);
    }

    register() {
        Set.sets.set(this.id, this);
    }

    static get(id: string): Set {
        const set = Set.sets.get(id);
        if (!set) {
            throw new SetNotFoundError(id);
        }
        return set;
    }

    // #endregion

    // #region Firestore Serialization/Deserialization

    static fromFirestore(data: SetFirestoreData): Set {
        return new Set(data.id, data.name);
    }

    toFirestore(): SetFirestoreData {
        return {
            id: this.id,
            name: this.name,
        };
    }

    // #endregion
}