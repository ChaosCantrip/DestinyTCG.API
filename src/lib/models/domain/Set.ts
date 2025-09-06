import { SetNotFoundError } from "@models/errors/SetNotFoundError";

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

    // Firestore serialization/deserialization

    static fromFirestore(data: any): Set {
        return new Set(data.id, data.name);
    }

    toFirestore(): any {
        return {
            id: this.id,
            name: this.name,
        };
    }
}