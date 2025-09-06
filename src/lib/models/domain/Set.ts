import { SetNotFoundError } from "@models/errors/SetNotFoundError";
import { SetFirestoreData } from "@models/firestore/SetFirestoreData";

export class Set {
    static sets = new Map<string, Set>();

    id: string;
    name: string;

    constructor(id: string, name: string) {
        this.id = id;
        this.name = name;
    }

    // Set registry methods

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