import { AdditionGate } from "../componenets/Addition";
import { Bit, BitArray, Gate } from "../gate";
import { AndGate } from "../gate/derived/and";
import { MultiBitAndGate } from "../gate/derived/and/multi/bit";
import { MultiWayDeMultiplexerGate } from "../gate/derived/demultiplexer/multi/ways";
import { MultiWayMultiplexerGate } from "../gate/derived/multiplexer/multi/ways";
import { NotGate } from "../gate/derived/not";
import { MultiBitNotGate } from "../gate/derived/not/multi/bit";
import { OrGate } from "../gate/derived/or";
import { MultiWayOrGate } from "../gate/derived/or/multi/ways";
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

    // calculate if zx or pass x as it is
    const afterZx = new MultiWayDeMultiplexerGate(this.length, 1).eval([
      x,
      [zx],
    ])[0];

    // calculate the nigation if x so if flag (nx) then we will pass its value
    const negateZX = new MultiBitNotGate(this.length).eval([afterZx])[0];

    // choose between the values (negateZx) and (afterZx) from flag (nx)
    const afterNx = new MultiWayMultiplexerGate(this.length, 1).eval([
      [afterZx, negateZX],
      [nx],
    ])[0];

    // calculate if zy or pass y as it is
    const afterZy = new MultiWayDeMultiplexerGate(this.length, 1).eval([
      y,
      [zy],
    ])[0];

    // calculate the nigation if y so if flag (ny) then we will pass its value
    const negateZy = new MultiBitNotGate(this.length).eval([afterZy])[0];

    // choose between the values (negateZy) and (afterZy) from flag (ny)
    const afterNy = new MultiWayMultiplexerGate(this.length, 1).eval([
      [afterZy, negateZy],
      [ny],
    ])[0];

    const additionXY = new AdditionGate(this.length).eval([
      afterNx,
      afterNy,
    ])[0];
    const andXY = new MultiBitAndGate(this.length).eval([afterNx, afterNy])[0];

    const afterF = new MultiWayMultiplexerGate(this.length, 1).eval([
      [andXY, additionXY],
      [f],
    ])[0];

    const negateAfterF = new MultiBitNotGate(this.length).eval([afterF])[0];

    const afterN = new MultiWayMultiplexerGate(this.length, 1).eval([
      [afterF, negateAfterF],
      [n],
    ])[0];

    // just for convintion will name it (out)
    const out = afterN;

    const zr = new NotGate().eval([
      new MultiWayOrGate(1, this.length).eval(out.map((bit) => [bit]))[0][0],
    ])[0];

    const ng = out[0];

    return [[afterN], [zr, ng]];
  }

  // eval(inputs: ALUInputs): ALUOutputs {
  //   const [[x, y], [zx, nx, zy, ny, f, n]] = inputs;

  //   if (x.length !== this.length)
  //     throw new Error(
  //       `x have incorrect length, is (${x.length}) but should be (${this.length})`
  //     );

  //   if (y.length !== this.length)
  //     throw new Error(
  //       `y have incorrect length, is (${y.length}) but should be (${this.length})`
  //     );

  //   let out: BitArray;
  //   let zr: Bit;
  //   let ng: Bit;

  //   let tX = x;
  //   let tY = y;

  //   if (zx === 1) {
  //     tX = tX.map(() => 0);
  //   }

  //   if (nx === 1) {
  //     const notGate = new NotGate();
  //     tX = tX.map((b) => notGate.eval([b])[0]);
  //   }

  //   if (zy === 1) {
  //     tY = tY.map(() => 0);
  //   }

  //   if (ny === 1) {
  //     const notGate = new NotGate();
  //     tY = tY.map((b) => notGate.eval([b])[0]);
  //   }

  //   if (f === 1) {
  //     const addidtionGate = new AdditionGate(this.length);
  //     out = addidtionGate.eval([tX, tY])[0];
  //   } else {
  //     const andGate = new MultiBitAnd(this.length);
  //     out = andGate.eval([tX, tY])[0];
  //   }

  //   if (n === 1) {
  //     const notGate = new MultiBitNotGate(this.length);
  //     out = notGate.eval([out])[0];
  //   }

  //   if (out[0] === 1) {
  //     ng = 1;
  //   } else {
  //     ng = 0;
  //   }

  //   const orGate = new OrGate();
  //   const isZero =
  //     out.reduce((acc, bit) => orGate.eval([acc, bit])[0], 0) === 0;
  //   if (isZero) {
  //     zr = 1;
  //   } else {
  //     zr = 0;
  //   }

  //   return [[out], [zr, ng]];
  // }
}
