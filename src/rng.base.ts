import { IRNG } from "./interfaces/IRNG";

export abstract class BaseRNG implements IRNG { 
    protected crypto: Crypto | null = null;

    public next(upperLimit: number): number {
        if (!this.crypto) {
            throw new Error("Rng not initialized.");
        }
        return this.generateSecureRandomLong(0, upperLimit);
    }

    public nextRange(ranges: number[]): number[] {
        return ranges.map((range) => this.next(range));
    }

    private generateSecureRandomLong(
        minValue: number,
        maxValue: number
    ): number {
        if (minValue >= maxValue) {
            throw new Error("minValue must be less than maxValue");
        }

        const range = maxValue - minValue;
        const buffer = new Uint8Array(Math.ceil(Math.log2(range) / 8));
        this.crypto!.getRandomValues(buffer);

        let randomValue = 0;
        buffer.forEach((byte) => {
            randomValue = (randomValue << 8) + byte;
        });

        return minValue + (randomValue % range);
    }
}