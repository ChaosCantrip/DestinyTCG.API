import { RarityFirestoreData } from "@models/firestore";
import { collection, getDocs } from "firebase/firestore";
import { Firestore } from "@lib/firestore";

export async function getAllRarities(): Promise<RarityFirestoreData[]> {
    const raritiesCollection = collection(Firestore.db, "rarities");
    const snapshot = await getDocs(raritiesCollection);
    const rarities: RarityFirestoreData[] = snapshot.docs.map(doc => doc.data() as RarityFirestoreData);
    return rarities;
}