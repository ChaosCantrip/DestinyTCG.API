import { PackFirestoreData } from "../firestore";

export class Pack
{
    id: string;
    name: string;

    constructor(id: string, name: string)
    {
        this.id = id;
        this.name = name;
    }

    // #region Firestore Serialization/Deserialization

    static fromFirestore(data: PackFirestoreData): Pack
    {
        return new Pack(
            data.id,
            data.name
        );
    }
    
    toFirestore(): PackFirestoreData
    {
        return {
            id: this.id,
            name: this.name
        };
    }
    
    // #endregion
}