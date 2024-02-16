import { Bit, BitArray, Gate } from "../../..";

type Inputs = [BitArray[], BitArray];
type Outputs = [BitArray];

export class MultiWayMultiplexerGate extends Gate<Inputs, Outputs> {
  // n is the bit length, m is the select bit length
  constructor(private n: number, private m: number) {
    super();
  }

  override eval([inputs, select]: Inputs): Outputs {
    // TODO: add length checks
    const indexOfResultToChange = parseInt(select.join(""), 2);

    return [inputs[indexOfResultToChange]];
  }
}
