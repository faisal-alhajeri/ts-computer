import { Bit, Gate } from "../..";
import { NandGate } from "../../base/nand";
import { AndGate } from "../and";
import { NotGate } from "../not";
import { OrGate } from "../or";

type Inputs = [[Bit, Bit], Bit];
type Outputs = [Bit];

export class MultiplexerGate extends Gate<Inputs, Outputs> {
  private andGate1: AndGate = new AndGate();
  private andGate2: AndGate = new AndGate();
  private notGate: NotGate = new NotGate();
  private orGate: OrGate = new OrGate();

  override async eval(inputs: Inputs): Promise<Outputs> {
    const [[x, y], selector] = inputs;

    const [div1, div2] = await Promise.all([
      this.andGate1.eval([y, selector]).then(([bit]) => bit),

      this.notGate
        .eval([selector])
        .then(
          async ([notSelector]) => await this.andGate2.eval([x, notSelector])
        )
        .then(([bit]) => bit),
    ]);

    return await this.orGate.eval([div1, div2]);

    // if (inputs[1] === 0) return [inputs[0][0]];
    // else return [inputs[0][1]];
  }
}
