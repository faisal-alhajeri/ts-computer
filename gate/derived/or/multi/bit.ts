import { OrGate } from "..";
import { BitArray, Gate } from "../../..";

type Inputs = [BitArray, BitArray];
type Outputs = [BitArray];

export class MultiBitOrGate extends Gate<Inputs, Outputs> {
  private gates: OrGate[];
  constructor(private length: number) {
    super();
    this.gates = new Array(length).fill(0).map(() => new OrGate());
  }

  override eval(inputs: Inputs): Outputs {
    if (inputs[0].length !== this.length || inputs[1].length !== this.length)
      throw new Error(
        `multi bit gate length error, expected (${this.length}, ${this.length}) but got (${inputs[0].length}, ${inputs[1].length})`
      );
    const res = this.gates.map(
      (gate, idx) => gate.eval([inputs[0][idx], inputs[1][idx]])[0]
    );

    return [res];
  }
}
