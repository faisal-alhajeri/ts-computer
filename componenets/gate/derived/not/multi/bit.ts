import { NotGate } from "..";
import { BitArray, Gate } from "../../..";
import { AndGate } from "../../and";

type Inputs = [BitArray];
type Outputs = [BitArray];

export class MultiBitNotGate extends Gate<Inputs, Outputs> {
  private gates: NotGate[];
  constructor(private length: number) {
    super();
    this.gates = new Array(length).fill(0).map(() => new NotGate());
  }

  override async eval(inputs: Inputs): Promise<Outputs> {
    if (inputs[0].length !== this.length)
      throw new Error(
        `multi bit gate length error, expected (${this.length}) but got (${inputs[0].length})`
      );

    const res = await Promise.all(
      this.gates.map(
        async (gate, idx) => (await gate.eval([inputs[0][idx]]))[0]
      )
    );

    return [res];
  }

  evalSync(inputs: Inputs): Outputs {
    if (inputs[0].length !== this.length)
      throw new Error(
        `multi bit gate length error, expected (${this.length}) but got (${inputs[0].length})`
      );

    const res = this.gates.map(
      (gate, idx) => gate.evalSync([inputs[0][idx]])[0]
    );

    return [res];
  }
}
