export * from "./interfaces/IRNG";
import { RNG as RngBrowser } from "./rng.browser";
import { RNG as RngNode } from "./rng.node";

let RNGClass;

if (typeof window !== "undefined" && window.crypto) {
    RNGClass = RngBrowser;
} else {
    RNGClass = RngNode;
}

export const RNG = RNGClass;