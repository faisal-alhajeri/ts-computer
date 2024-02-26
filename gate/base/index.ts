export type Bit = 0 | 1;
export type BitArray = Bit[];
export type BitInput = Bit | BitArray | BitInput[];

export abstract class Gate<T extends BitInput[], V extends BitInput[]> {
  abstract eval(inputs: T): Promise<V>;

  static zero(bitLength: number): BitArray {
    return new Array(bitLength).fill(0);
  }
}
