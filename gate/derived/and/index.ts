import { Bit, Gate } from "../..";

type Inputs = [Bit, Bit];
type Outputs = [Bit];

export class AndGate extends Gate<Inputs, Outputs> {
  override eval(inputs: Inputs): Outputs {
    if (inputs[0] === 1 && inputs[1] === 1) return [1];

    return [0];
  }
}
