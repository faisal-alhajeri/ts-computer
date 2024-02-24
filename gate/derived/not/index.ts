import { Bit, Gate } from "../..";
import { NandGate } from "../../base/nand";

type Inputs = [Bit];
type Outputs = [Bit];

export class NotGate extends Gate<Inputs, Outputs> {
  private nandGate = new NandGate();

  override async eval(inputs: Inputs): Promise<Outputs> {
    return await this.nandGate.eval([inputs[0], inputs[0]]);
  }
}
