import { OrGate } from "..";
import { Bit, BitArray, Gate } from "../../..";

type Inputs = [BitArray];
type Outputs = [Bit];

export class MultiWayOrGate extends Gate<Inputs, Outputs> {
  private gates: OrGate[];
  constructor(private length: number) {
    super();
    this.gates = new Array(length).fill(0).map(() => new OrGate());
  }

  override eval(inputs: Inputs): Outputs {
    if (inputs[0].length !== this.length)
      throw new Error(
        `multi bit gate length error, expected (${this.length}) but got (${inputs[0].length})`
      );

    let res = inputs[0][0];
    for (let i = 1; i < this.length; i++) {
      [res] = this.gates[i].eval([res, inputs[0][i]]);
    }

    return [res];
  }
}
