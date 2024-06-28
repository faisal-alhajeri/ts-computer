import { Bit, Gate } from "../..";
import { NandGate } from "../../base/nand";
import { AndGate } from "../and";
import { NotGate } from "../not";

type Inputs = [Bit, Bit];
type Outputs = [Bit];

export class OrGate extends Gate<Inputs, Outputs> {
  private nandGate = new NandGate();
  private notGate1 = new NotGate();
  private notGate2 = new NotGate();
  override async eval(inputs: Inputs): Promise<Outputs> {
    const [x, y] = inputs;

    const [notX, notY] = await Promise.all([
      this.notGate1.eval([x]).then((res) => res[0]),
      this.notGate2.eval([y]).then((res) => res[0]),
    ]);

    return await this.nandGate.eval([notX, notY]);
  }

  evalSync(inputs: Inputs): Outputs {
    const [x, y] = inputs;

    const notX = this.notGate1.evalSync([x])[0];
    const notY = this.notGate2.evalSync([y])[0];

    return this.nandGate.evalSync([notX, notY]);
  }
}
