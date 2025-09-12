import { DestinyTCGError } from "./DestinyTCGError";

export class RarityAlreadyRegisteredError extends DestinyTCGError 
{
    name: string;
    rarityName: string;

    constructor(rarityName: string) 
    {
        super(`Rarity with name ${rarityName} is already registered.`);
        this.name = "RarityAlreadyRegisteredError";
        this.rarityName = rarityName;
    }
}