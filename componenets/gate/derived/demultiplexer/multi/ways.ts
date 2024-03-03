import { Bit, BitArray, Gate } from "../../..";

type Inputs = [BitArray, BitArray];
type Outputs = BitArray[];

export class MultiWayDeMultiplexerGate extends Gate<Inputs, Outputs> {
  // n is the bit length, m is the select bit length
  constructor(private n: number, private m: number) {
    super();
  }

  override async eval([input, select]: Inputs): Promise<Outputs> {
    // TODO: add length check
    const result: Outputs = new Array(Math.pow(2, this.m))
      .fill(0)
      .map(() => new Array(this.n).fill(0));

    const indexOfResultToChange = parseInt(select.join(""), 2);

    result[indexOfResultToChange] = input;

    return result;
  }
}
