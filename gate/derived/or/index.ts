import { Bit, Gate } from "../..";

type Inputs = [Bit, Bit];
type Outputs = [Bit];

export class OrGate extends Gate<Inputs, Outputs> {
  override eval(inputs: Inputs): Outputs {
    if (inputs[0] === 0 && inputs[1] === 0) return [0];

    return [1];
  }
}
