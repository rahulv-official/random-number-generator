import { IRNG } from "./interfaces/IRNG";

export class RNG implements IRNG {
    #crypto: Crypto | null = null;

    static async init(): Promise<RNG> {
        const rng = new RNG();
        await rng.initializeCrypto();
        return rng;
    }

    private async initializeCrypto(): Promise<void> {
        if (typeof window !== "undefined" && window.crypto) {
            this.#crypto = window.crypto;
        } else {
            const cryptoModule = await import("crypto");
            this.#crypto = cryptoModule.webcrypto as unknown as Crypto;
        }
    }

    async next(upperLimit: number): Promise<number> {
        if (!this.#crypto) {
            throw new Error("Rng not initialized. Use RNG.init() to initialize.");
        }
        return this.generateSecureRandomLong(0, upperLimit);
    }

    async nextRange(ranges: number[]): Promise<number[]> {
        return Promise.all(ranges.map((range) => this.next(range)));
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
        this.#crypto!.getRandomValues(buffer);

        let randomValue = 0;
        buffer.forEach((byte) => {
            randomValue = (randomValue << 8) + byte;
        });

        return minValue + (randomValue % range);
    }
}
