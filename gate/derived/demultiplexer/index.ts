import { Bit, Gate } from "../..";

type Inputs = [[Bit], Bit];
type Outputs = [Bit, Bit];

export class DeMultiplexerGate extends Gate<Inputs, Outputs> {
  override eval(inputs: Inputs): Outputs {
    const res: Outputs = [0, 0];

    res[inputs[1]] = inputs[0][0];

    return res;
  }
}
