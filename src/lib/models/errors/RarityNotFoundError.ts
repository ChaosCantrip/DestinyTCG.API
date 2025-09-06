export class RarityNotFoundError extends Error {
    name: string;
    rarityName: string;

    constructor(rarityName: string) {
        super(`Rarity "${rarityName}" not found.`);
        this.name = "RarityNotFoundError";
        this.rarityName = rarityName;
    }
}