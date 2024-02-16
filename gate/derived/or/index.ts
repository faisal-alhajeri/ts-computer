import { Bit, Gate } from "../..";
import { NandGate } from "../../base/nand";
import { AndGate } from "../and";
import { NotGate } from "../not";

type Inputs = [Bit, Bit];
type Outputs = [Bit];

export class OrGate extends Gate<Inputs, Outputs> {
  override eval(inputs: Inputs): Outputs {
    const [x, y] = inputs;
    const nandGate = new NandGate();
    const notGate1 = new NotGate();
    const notGate2 = new NotGate();

    return nandGate.eval([...notGate1.eval([x]), ...notGate2.eval([y])]);
  }
}
