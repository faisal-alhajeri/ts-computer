import { Bit, BitArray, Gate } from "../../..";
import { MultiBitMultiplexerGate } from "./bit";

type Inputs = [BitArray[], BitArray];
type Outputs = [BitArray];

export class MultiWayMultiplexerGate extends Gate<Inputs, Outputs> {
  private multies: MultiBitMultiplexerGate[][];

  // n is the bit length, m is the select bit length
  constructor(private bitLength: number, private selectorLength: number) {
    super();

    this.multies = new Array(selectorLength)
      .fill(0)
      .map((_, selectorIdx) =>
        new Array(Math.pow(2, selectorLength - (selectorIdx + 1)))
          .fill(0)
          .map(() => new MultiBitMultiplexerGate(bitLength))
      );
  }

  override async eval(inputs: Inputs): Promise<Outputs> {
    const [inBits, selector] = inputs;

    let stage_result: BitArray[] = [...inBits];

    for (let stage = 0; stage < this.selectorLength; stage++) {
      const stage_multies = this.multies[stage];
      const stage_selector = selector[this.selectorLength - (stage + 1)];

      stage_result = await Promise.all(
        stage_multies.map(async (gate, idx) => {
          const offset = 2 * idx;
          const x = stage_result[offset];
          const y = stage_result[offset + 1];
          return await gate
            .eval([[x, y], stage_selector])
            .then(([bits]) => bits);
        })
      );
    }

    return [stage_result[0]];

    // // TODO: add length checks
    // const indexOfResultToChange = parseInt(select.join(""), 2);

    // return [inputs[indexOfResultToChange]];
  }
}
