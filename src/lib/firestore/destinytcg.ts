import { RarityFirestoreData, SetFirestoreData, CardFirestoreData } from "@models/firestore";
import { collection, getDocs } from "firebase/firestore";
import { Firestore } from "@lib/firestore";

export async function getAllRarities(): Promise<RarityFirestoreData[]> {
    console.log("Getting all rarities from Firestore...");
    const raritiesCollection = collection(Firestore.db, "rarities");
    const snapshot = await getDocs(raritiesCollection);
    const rarities: RarityFirestoreData[] = snapshot.docs.map(doc => doc.data() as RarityFirestoreData);
    console.log(`Retrieved ${rarities.length} rarities from Firestore.`);
    return rarities;
}

export async function getAllSets(): Promise<SetFirestoreData[]> {
    console.log("Getting all sets from Firestore...");
    const setsCollection = collection(Firestore.db, "sets");
    const snapshot = await getDocs(setsCollection);
    const sets: SetFirestoreData[] = snapshot.docs.map(doc => doc.data() as SetFirestoreData);
    console.log(`Retrieved ${sets.length} sets from Firestore.`);
    return sets;
}

export async function getAllCards(): Promise<CardFirestoreData[]> {
    console.log("Getting all cards from Firestore...");
    const cardsCollection = collection(Firestore.db, "cards");
    const snapshot = await getDocs(cardsCollection);
    const cards: CardFirestoreData[] = snapshot.docs.map(doc => doc.data() as CardFirestoreData);
    console.log(`Retrieved ${cards.length} cards from Firestore.`);
    return cards;
}