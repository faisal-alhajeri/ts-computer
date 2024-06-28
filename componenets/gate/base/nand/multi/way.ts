import { NandGate } from "..";
import { BitArray, Gate } from "../../..";
import { MultiBitAndGate } from "../../../derived/and/multi/bit";
import { NotGate } from "../../../derived/not";
import { MultiBitNotGate } from "../../../derived/not/multi/bit";
import { MultiBitNandGate } from "./bit";

export type MultiWayNandInputs = BitArray[];
export type MultiWayNandOutputs = [BitArray];

export class MultiWayNandGate extends Gate<
  MultiWayNandInputs,
  MultiWayNandOutputs
> {
  private andGates: MultiBitAndGate[];
  private notGate: MultiBitNotGate;
  constructor(bitLength: number, private ways: number) {
    super();

    this.notGate = new MultiBitNotGate(bitLength);
    this.andGates = new Array(ways - 1)
      .fill(0)
      .map(() => new MultiBitAndGate(bitLength));
  }

  async eval(inputs: MultiWayNandInputs): Promise<MultiWayNandOutputs> {
    if (inputs.length !== this.ways) {
      throw new Error(
        `number of inputs doesnt match number of ways, ways=${this.ways} inputs=${inputs.length}`
      );
    }

    let intermidate_result: BitArray = inputs[0];
    for (let i = 1; i < inputs.length; i++) {
      const andGate = this.andGates[i];
      intermidate_result = (
        await andGate.eval([intermidate_result, inputs[i]])
      )[0];
    }

    return await this.notGate.eval([intermidate_result]);
  }

  evalSync(inputs: MultiWayNandInputs): MultiWayNandOutputs {
    if (inputs.length !== this.ways) {
      throw new Error(
        `number of inputs doesnt match number of ways, ways=${this.ways} inputs=${inputs.length}`
      );
    }

    let intermidate_result: BitArray = inputs[0];
    for (let i = 1; i < inputs.length; i++) {
      const andGate = this.andGates[i];
      intermidate_result = andGate.evalSync([intermidate_result, inputs[i]])[0];
    }

    return this.notGate.evalSync([intermidate_result]);
  }
}
