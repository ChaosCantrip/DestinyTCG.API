export class Set {
    id: string;
    name: string;

    constructor(id: string, name: string) {
        this.id = id;
        this.name = name;
    }

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