import { UserFirestoreData } from "../firestore";

export class User
{
    id: string;

    constructor(id: string)
    {
        this.id = id;
    }

    // #region Firestore Serialization/Deserialization

    static fromFirestore(data: UserFirestoreData): User
    {
        return new User(
            data.id
        );
    }
    
    toFirestore(): UserFirestoreData
    {
        return {
            id: this.id
        };
    }
    
    // #endregion
}