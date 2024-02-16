import { Bit, Gate } from "../..";
import { NandGate } from "../../base/nand";
import { NotGate } from "../not";

type Inputs = [Bit, Bit];
type Outputs = [Bit];

export class AndGate extends Gate<Inputs, Outputs> {
  override eval(inputs: Inputs): Outputs {
    const nandGate = new NandGate();
    const notGate = new NotGate();
    return notGate.eval(nandGate.eval(inputs));
  }
}
