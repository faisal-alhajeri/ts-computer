import { NandGate } from "..";
import { BitArray, Gate } from "../../..";

export type MultiBitNandInputs = [BitArray, BitArray];
export type MultiBitNandOutputs = [BitArray];

export class MultiBitNandGate extends Gate<
  MultiBitNandInputs,
  MultiBitNandOutputs
> {
  private gates: NandGate[];
  constructor(private length: number) {
    super();
    this.gates = new Array(length).fill(0).map(() => new NandGate());
  }

  async eval(inputs: MultiBitNandInputs): Promise<MultiBitNandOutputs> {
    if (inputs[0].length !== this.length || inputs[1].length !== this.length)
      throw new Error(
        `multi bit gate length error, expected (${this.length}, ${this.length}) but got (${inputs[0].length}, ${inputs[1].length})`
      );

    const res = await Promise.all(
      this.gates.map(
        async (gate, idx) =>
          (
            await gate.eval([inputs[0][idx], inputs[1][idx]])
          )[0]
      )
    );

    return [res];
  }
}
