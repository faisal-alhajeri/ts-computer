import { OrGate } from "..";
import { Bit, BitArray, Gate } from "../../..";
import { MultiBitOrGate } from "./bit";

type Inputs = BitArray[];
type Outputs = [BitArray];

export class MultiWayOrGate extends Gate<Inputs, Outputs> {
  private gates: MultiBitOrGate[];
  constructor(private bitLength: number, private ways: number) {
    super();
    this.gates = new Array(ways)
      .fill(0)
      .map(() => new MultiBitOrGate(bitLength));
  }

  override eval(inputs: Inputs): Outputs {
    if (inputs.length !== this.ways)
      throw new Error(
        `multi bit gate length error, expected (${this.ways}) but got (${inputs[0].length})`
      );

    let intermidiate_result = inputs[0];

    for (let i = 1; i < this.ways; i++) {
      const orGate = this.gates[i];
      intermidiate_result = orGate.eval([intermidiate_result, inputs[i]])[0];
    }

    return [intermidiate_result];
  }
}
