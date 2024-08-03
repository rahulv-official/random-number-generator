import { IRNG } from "./interfaces/IRNG";
import { BaseRNG } from "./rng.base";

export class RNG extends BaseRNG implements IRNG {
    constructor() {
        super();
        if (typeof window !== "undefined" && window.crypto) {
            this.crypto = window.crypto;
        } else {
            throw new Error("Crypto not supported in this environment.");
        }
    }
}