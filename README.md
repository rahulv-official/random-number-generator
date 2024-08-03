# @rahulv.dev/rng

Secure, cryptographic random number generation for Node.js and browsers. This package provides an easy-to-use interface for generating random numbers within specified ranges, leveraging the native Crypto API.

## Features

-   Generate a secure random number up to a specified upper limit.
-   Generate secure random numbers for an array of upper limits.

## Installation

Install `@rahulv.dev/rng` using npm:

```bash
npm install @rahulv.dev/rng
```

or using yarn:

```bash
yarn add @rahulv.dev/rng
```

or using pnpm:

```bash
pnpm install @rahulv.dev/rng
```

## Usage

### Importing the module

```typescript
// For Node environment
import { RNG } from "@rahulv.dev/rng";
```

### Initializing the RNG

Before using the RNG, you need to initialize it:

```typescript
function setupRng() {
    const rng = new RNG();
    return rng;
}
```

### Generating a Random Number

To generate a random number within a specified range:

```typescript
function generateRandom() {
    const rng = setupRng();
    const randomNumber = rng.next(100); // Generates a random number between 0 and 99
    console.log(randomNumber);
}

generateRandom();
```

### Generating Multiple Random Number

To generate a random number within a specified range:

```typescript
function generateMultipleRandoms() {
    const rng = setupRng();
    const randomNumbers = rng.nextRange([10, 100, 1000]);
    console.log(randomNumbers); // e.g., [2, 59, 874]
}

generateMultipleRandoms();
```

## API Reference

Here’s a detailed look at the API methods provided by `@rahulv.dev/rng`:

| Method              | Description                                                        | Parameters                                                                                                                          | Returns                                                                                                                  |
| ------------------- | ------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `next(upperLimit)`  | Generates a secure random number between `0` and `upperLimit - 1`. | `upperLimit: number`: The upper limit for the random number (exclusive)                                                             | `number`: A random number within the specified range.                                                                    |
| `nextRange(ranges)` | Generates random numbers for an array of upper limits.             | `ranges: number[]`: An array of upper limits. Each element specifies the exclusive upper limit for the corresponding random number. | `number[]`: An array of random numbers, each within the range specified by the corresponding element in the input array. |

### Usage Examples

Here is a complete usage examples of how to use the methods provided by `@rahulv.dev/rng`:

```typescript
import { RNG } from "@rahulv.dev/rng";

function main() {
    const rng = new RNG();

    // Generating a single random number
    const randomNumber = rng.next(100);
    console.log(`Random Number: ${randomNumber}`);

    // Generating multiple random numbers
    const randomNumbers = rng.nextRange([10, 100, 1000]);
    console.log(`Random Numbers: ${randomNumbers.join(", ")}`);
}

main();
```

**NOTE**: If you are unable to use package with vite, install [Vite Pollyfills](https://www.npmjs.com/package/vite-plugin-node-polyfills).

## Contributing

Contributions are always welcome! Create an issue or raise a PR for contributing.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
