import { Bit, BitArray, Gate } from "../gate";

type Inputs = [BitArray, BitArray];
type Outputs = [BitArray, Bit];
export class AdditionGate extends Gate<Inputs, Outputs> {
  constructor(private length: number) {
    super();
  }

  async eval(inputs: Inputs): Promise<Outputs> {
    const [x, y] = inputs;

    if (x.length !== this.length)
      throw new Error(
        `x have incorrect length, is (${x.length}) but should be (${this.length})`
      );

    if (y.length !== this.length)
      throw new Error(
        `y have incorrect length, is (${y.length}) but should be (${this.length})`
      );

    const result: BitArray = new Array(this.length).fill(0);

    let overflow: Bit = 0;
    for (let i = x.length - 1; i >= 0; i--) {
      const bitX = x[i];
      const bitY = y[i];

      const resInInt = bitX + bitY + overflow;

      if (resInInt === 0) {
        result[i] = 0;
        overflow = 0;
      } else if (resInInt === 1) {
        result[i] = 1;
        overflow = 0;
      } else if (resInInt === 2) {
        result[i] = 0;
        overflow = 1;
      } else if (resInInt === 3) {
        result[i] = 1;
        overflow = 1;
      }
    }

    return [result, overflow];
  }

  evalSync(inputs: Inputs): Outputs {
    const [x, y] = inputs;

    if (x.length !== this.length)
      throw new Error(
        `x have incorrect length, is (${x.length}) but should be (${this.length})`
      );

    if (y.length !== this.length)
      throw new Error(
        `y have incorrect length, is (${y.length}) but should be (${this.length})`
      );

    const result: BitArray = new Array(this.length).fill(0);

    let overflow: Bit = 0;
    for (let i = x.length - 1; i >= 0; i--) {
      const bitX = x[i];
      const bitY = y[i];

      const resInInt = bitX + bitY + overflow;

      if (resInInt === 0) {
        result[i] = 0;
        overflow = 0;
      } else if (resInInt === 1) {
        result[i] = 1;
        overflow = 0;
      } else if (resInInt === 2) {
        result[i] = 0;
        overflow = 1;
      } else if (resInInt === 3) {
        result[i] = 1;
        overflow = 1;
      }
    }

    return [result, overflow];
  }
}
