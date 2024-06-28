import { MultiplexerGate } from "..";
import { Bit, BitArray, Gate } from "../../..";

type Inputs = [[BitArray, BitArray], Bit];
type Outputs = [BitArray];

export class MultiBitMultiplexerGate extends Gate<Inputs, Outputs> {
  private multies: MultiplexerGate[];

  constructor(private bitLength: number) {
    super();
    this.multies = new Array(bitLength)
      .fill(0)
      .map(() => new MultiplexerGate());
  }

  override async eval(inputs: Inputs): Promise<Outputs> {
    const [[xBits, yBits], selector] = inputs;

    if (xBits.length !== this.bitLength || yBits.length !== this.bitLength)
      throw new Error(
        `multi bit gate length error, expected (${this.bitLength}, ${this.bitLength}) but got (${xBits.length}, ${yBits.length})`
      );

    const res: BitArray = await Promise.all(
      this.multies.map(
        async (gate, idx) =>
          await gate
            .eval([[xBits[idx], yBits[idx]], selector])
            .then(([bit]) => bit)
      )
    );

    return [res];
  }

  evalSync(inputs: Inputs): Outputs {
    const [[xBits, yBits], selector] = inputs;

    if (xBits.length !== this.bitLength || yBits.length !== this.bitLength)
      throw new Error(
        `multi bit gate length error, expected (${this.bitLength}, ${this.bitLength}) but got (${xBits.length}, ${yBits.length})`
      );

    const res: BitArray = this.multies.map(
      (gate, idx) => gate.evalSync([[xBits[idx], yBits[idx]], selector])[0]
    );

    return [res];
  }
}
