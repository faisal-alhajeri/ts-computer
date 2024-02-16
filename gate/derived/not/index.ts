import { Bit, Gate } from "../..";
import { NandGate } from "../../base/nand";

type Inputs = [Bit];
type Outputs = [Bit];

export class NotGate extends Gate<Inputs, Outputs> {
  override eval(inputs: Inputs): Outputs {
    const nandGate = new NandGate();
    return nandGate.eval([inputs[0], inputs[0]]);
  }
}
