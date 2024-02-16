import { Bit, Gate } from "../..";

type Inputs = [Bit];
type Outputs = [Bit];

export class NotGate extends Gate<Inputs, Outputs> {
  override eval(inputs: Inputs): Outputs {
    if (inputs[0] === 0) return [1];

    return [0];
  }
}
