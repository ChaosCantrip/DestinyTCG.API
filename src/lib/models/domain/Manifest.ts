import { Card, Set, Rarity } from ".";
import { Logger, LogLevel } from "../../utils";

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
            Logger.yellow("Manifest is already initialised.", LogLevel.WARN);
            return;
        }

        Logger.startSection("Initialising Manifest");

        await Set.initialise();
        await Rarity.initialise();
        await Card.initialise();
        this._initialised = true;

        Logger.endSection("Manifest Initialised");
    }
}