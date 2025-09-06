import { RarityFirestoreData, SetFirestoreData, CardFirestoreData } from "@models/firestore";
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

export async function getAllCards(): Promise<CardFirestoreData[]> {
    const cardsCollection = collection(Firestore.db, "cards");
    const snapshot = await getDocs(cardsCollection);
    const cards: CardFirestoreData[] = snapshot.docs.map(doc => doc.data() as CardFirestoreData);
    return cards;
}