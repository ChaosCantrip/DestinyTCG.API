import { RarityFirestoreData, SetFirestoreData } from "@models/firestore";
import { collection, getDocs } from "firebase/firestore";
import { Firestore } from "@lib/firestore";

export async function getAllRarities(): Promise<RarityFirestoreData[]> {
    const raritiesCollection = collection(Firestore.db, "rarities");
    const snapshot = await getDocs(raritiesCollection);
    const rarities: RarityFirestoreData[] = snapshot.docs.map(doc => doc.data() as RarityFirestoreData);
    return rarities;
}

export async function getAllSets(): Promise<SetFirestoreData[]> {
    const setsCollection = collection(Firestore.db, "sets");
    const snapshot = await getDocs(setsCollection);
    const sets: SetFirestoreData[] = snapshot.docs.map(doc => doc.data() as SetFirestoreData);
    return sets;
}