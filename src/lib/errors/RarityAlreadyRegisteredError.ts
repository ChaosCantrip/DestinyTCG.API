export class RarityAlreadyRegisteredError extends Error 
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