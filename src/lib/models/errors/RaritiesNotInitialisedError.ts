export class RaritiesNotInitialisedError extends Error {
    name: string;

    constructor() {
        super(`Rarities have not been initialised.`);
        this.name = "RaritiesNotInitialisedError";
    }
}