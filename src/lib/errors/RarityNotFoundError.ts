import { DestinyTCGError } from "./DestinyTCGError";

export class RarityNotFoundError extends DestinyTCGError 
{
    name: string;
    rarityName: string;

    constructor(rarityName: string) 
    {
        super(`Rarity "${rarityName}" not found.`);
        this.name = "RarityNotFoundError";
        this.rarityName = rarityName;
    }
}