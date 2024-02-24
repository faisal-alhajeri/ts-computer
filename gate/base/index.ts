export type Bit = 0 | 1;
export type BitArray = Bit[];
export type BitInput = Bit | BitArray | BitInput[];

export abstract class Gate<T extends BitInput[], V extends BitInput[]> {
  abstract eval(inputs: T): Promise<V>;
}
