export interface IRNG {
    next(upperLimit: number): Promise<number>;
    nextRange(ranges: number[]): Promise<number[]>;
}