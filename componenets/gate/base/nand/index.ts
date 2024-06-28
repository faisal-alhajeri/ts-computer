import { Bit, Gate } from "../..";

export type NandInputs = [Bit, Bit];
export type NandOutputs = [Bit];

export class NandGate extends Gate<NandInputs, NandOutputs> {
  async eval(inputs: NandInputs): Promise<NandOutputs> {
    const [x, y] = inputs;
    if (x === 1 && y === 1) return [0];
    else return [1];
  }

  evalSync(inputs: NandInputs): NandOutputs {
    const [x, y] = inputs;
    if (x === 1 && y === 1) return [0];
    else return [1];
  }
}
