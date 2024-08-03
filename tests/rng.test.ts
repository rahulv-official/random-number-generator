import { describe, it, expect, beforeAll } from 'vitest';

let RNG: any;

beforeAll(async () => {
    if (typeof window !== 'undefined') {
        // Browser environment
        RNG = (await import('../src/rng.browser')).RNG;
    } else {
        // Node.js environment
        RNG = (await import('../src/rng.node')).RNG;
    }
});

describe('RNG Class', () => {
    let rng: any;

    beforeAll(() => {
        rng = new RNG();
    });

    it('should be initialized properly', () => {
        expect(rng).toBeDefined();
    });

    it('should generate a random number within the given upper limit', () => {
        const upperLimit = 100;
        const randomNumber = rng.next(upperLimit);
        expect(randomNumber).toBeGreaterThanOrEqual(0);
        expect(randomNumber).toBeLessThan(upperLimit);
    });

    it('should throw an error if minValue is greater than or equal to maxValue', () => {
        const minValue = 10;
        const maxValue = 5;
        expect(() => rng['generateSecureRandomLong'](minValue, maxValue)).toThrowError(
            'minValue must be less than maxValue'
        );
    });

    it('should generate random numbers within the given ranges', () => {
        const ranges = [10, 50, 100];
        const randomNumbers = rng.nextRange(ranges);

        expect(randomNumbers.length).toBe(ranges.length);
        randomNumbers.forEach((num, index) => {
            expect(num).toBeGreaterThanOrEqual(0);
            expect(num).toBeLessThan(ranges[index]);
        });
    });

    it('should throw an error if RNG is not initialized and next is called', () => {
        class UninitializedRNG extends RNG {
            constructor() {
                super();
                this.crypto = null; // Simulate uninitialized state
            }
        }

        const uninitializedRng = new UninitializedRNG();
        expect(() => uninitializedRng.next(10)).toThrowError(
            'Rng not initialized.'
        );
    });
});
