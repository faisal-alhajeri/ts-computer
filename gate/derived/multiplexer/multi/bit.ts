import { Bit, BitArray, Gate } from "../../..";

type Inputs = [[BitArray, BitArray], Bit];
type Outputs = [BitArray];

export class MultiBitMultiplexerGate extends Gate<Inputs, Outputs> {
  override eval(inputs: Inputs): Outputs {
    if (inputs[1] === 0) return [inputs[0][0]];
    else return [inputs[0][1]];
  }
}
