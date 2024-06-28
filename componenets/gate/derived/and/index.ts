import { Bit, Gate } from "../..";
import { NandGate } from "../../base/nand";
import { NotGate } from "../not";

type Inputs = [Bit, Bit];
type Outputs = [Bit];

export class AndGate extends Gate<Inputs, Outputs> {
  private nandGate = new NandGate();
  private notGate = new NotGate();

  override async eval(inputs: Inputs): Promise<Outputs> {
    return await this.notGate.eval(await this.nandGate.eval(inputs));
  }

  evalSync(inputs: Inputs): Outputs {
    return this.notGate.evalSync(this.nandGate.evalSync(inputs));
  }
}
