import { Bit, Gate } from "../..";

type Inputs = [[Bit, Bit], Bit];
type Outputs = [Bit];

export class MultiplexerGate extends Gate<Inputs, Outputs> {
  override eval(inputs: Inputs): Outputs {
    if (inputs[1] === 0) return [inputs[0][0]];
    else return [inputs[0][1]];
  }
}
