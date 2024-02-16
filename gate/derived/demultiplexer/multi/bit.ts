import { Bit, BitArray, Gate } from "../../..";

type Inputs = [BitArray, Bit];
type Outputs = [BitArray, BitArray];

export class MultiBitDeMultiplexerGate extends Gate<Inputs, Outputs> {
  override eval(inputs: Inputs): Outputs {
    const length = inputs[0].length;
    const res: Outputs = [new Array(length).fill(0), new Array(length).fill(0)];

    res[inputs[1]] = inputs[0];

    return res;
  }
}
