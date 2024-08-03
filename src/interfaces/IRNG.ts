export interface IRNG {
    next(upperLimit: number): number;
    nextRange(ranges: number[]): number[];
}