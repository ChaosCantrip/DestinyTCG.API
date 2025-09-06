import { Card, Set, Rarity } from "@lib/models/domain";

export class Manifest 
{
    private static _initialised = false;

    public static isInitialised(): boolean 
    {
        return this._initialised;
    }

    public static async initialise() 
    {
        if (this._initialised) 
        {
            console.log("Manifest is already initialised.");
            return;
        }
        console.log("Initialising manifest...");

        await Card.initialise();
        await Set.initialise();
        await Rarity.initialise();

        console.log("Manifest initialised.");
        this._initialised = true;
    }
}