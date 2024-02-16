import { AdditionGate } from "../componenets/Addition";
import { Bit, BitArray, Gate } from "../gate";
import { AndGate } from "../gate/derived/and";
import { MultiBitAnd } from "../gate/derived/and/multi/bit";
import { NotGate } from "../gate/derived/not";
import { MultiBitNotGate } from "../gate/derived/not/multi/bit";
import { OrGate } from "../gate/derived/or";
export type ALUControl = [Bit, Bit, Bit, Bit, Bit, Bit];
export type ALUInputs = [[BitArray, BitArray], ALUControl];
export type ALUOutputs = [[BitArray], [Bit, Bit]];

export class ALU extends Gate<ALUInputs, ALUOutputs> {
  constructor(private length: number) {
    super();
  }

  eval(inputs: ALUInputs): ALUOutputs {
    const [[x, y], [zx, nx, zy, ny, f, n]] = inputs;

    if (x.length !== this.length)
      throw new Error(
        `x have incorrect length, is (${x.length}) but should be (${this.length})`
      );

    if (y.length !== this.length)
      throw new Error(
        `y have incorrect length, is (${y.length}) but should be (${this.length})`
      );

    let out: BitArray;
    let zr: Bit;
    let ng: Bit;

    let tX = x;
    let tY = y;

    if (zx === 1) {
      tX = tX.map(() => 0);
    }

    if (nx === 1) {
      const notGate = new NotGate();
      tX = tX.map((b) => notGate.eval([b])[0]);
    }

    if (zy === 1) {
      tY = tY.map(() => 0);
    }

    if (ny === 1) {
      const notGate = new NotGate();
      tY = tY.map((b) => notGate.eval([b])[0]);
    }

    if (f === 1) {
      const addidtionGate = new AdditionGate(this.length);
      out = addidtionGate.eval([tX, tY])[0];
    } else {
      const andGate = new MultiBitAnd(this.length);
      out = andGate.eval([tX, tY])[0];
    }

    if (n === 1) {
      const notGate = new MultiBitNotGate(this.length);
      out = notGate.eval([out])[0];
    }

    if (out[0] === 1) {
      ng = 1;
    } else {
      ng = 0;
    }

    const orGate = new OrGate();
    const isZero =
      out.reduce((acc, bit) => orGate.eval([acc, bit])[0], 0) === 0;
    if (isZero) {
      zr = 1;
    } else {
      zr = 0;
    }

    return [[out], [zr, ng]];
  }
}
