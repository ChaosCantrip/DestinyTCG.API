export class Rarity {
    static readonly COMMON = new Rarity('Common');
    static readonly UNCOMMON = new Rarity('Uncommon');
    static readonly RARE = new Rarity('Rare');
    static readonly LEGENDARY = new Rarity('Legendary');

    name: string;

    private constructor(name: string) {
        this.name = name;
    }

    toString() {
        return this.name;
    }

    static fromFirestore(value: string): Rarity {
        switch (value) {
            case 'Common':
                return Rarity.COMMON;
            case 'Uncommon':
                return Rarity.UNCOMMON;
            case 'Rare':
                return Rarity.RARE;
            case 'Legendary':
                return Rarity.LEGENDARY;
            default:
                throw new Error(`Unknown rarity: ${value}`);
        }
    }

    toFirestore(): string {
        return this.name;
    }
}