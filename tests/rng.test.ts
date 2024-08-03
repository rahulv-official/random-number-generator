import { describe, it, expect, beforeAll } from 'vitest';
import { RNG } from '../src';

describe('RNG Class', () => {
    let rng: RNG;

    beforeAll(async () => {
        rng = await RNG.init();
    });

    it('should be initialized properly', () => {
        expect(rng).toBeDefined();
    });

    it('should generate a random number within the given upper limit', async () => {
        const upperLimit = 100;
        const randomNumber = await rng.next(upperLimit);
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

    it('should generate random numbers within the given ranges', async () => {
        const ranges = [10, 50, 100];
        const randomNumbers = await rng.nextRange(ranges);

        expect(randomNumbers.length).toBe(ranges.length);
        randomNumbers.forEach((num, index) => {
            expect(num).toBeGreaterThanOrEqual(0);
            expect(num).toBeLessThan(ranges[index]);
        });
    });

    it('should throw an error if RNG is not initialized and next is called', async () => {
        const uninitializedRng = new RNG();
        await expect(uninitializedRng.next(10)).rejects.toThrowError(
            'Rng not initialized. Use RNG.init() to initialize.'
        );
    });
});
