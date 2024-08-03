import { IRNG } from "./interfaces/IRNG";
import { BaseRNG } from "./rng.base";
import { webcrypto } from "crypto";

export class RNG extends BaseRNG implements IRNG { 
    constructor() {
        super();
        this.crypto = webcrypto as unknown as Crypto;
    }
}