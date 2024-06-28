import { AdditionGate } from "../custom/Addition";
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
// outputs are result, zr, ng
export type ALUOutputs = [[BitArray], [Bit, Bit]];

export class ALU extends Gate<ALUInputs, ALUOutputs> {
  private zxGate: MultiWayDeMultiplexerGate;
  private negateZxGate: MultiBitNotGate;
  private nxGate: MultiWayMultiplexerGate;

  private zyGate: MultiWayDeMultiplexerGate;
  private negateZyGate: MultiBitNotGate;
  private nyGate: MultiWayMultiplexerGate;

  private additionXYGate: AdditionGate;
  private andXYGate: MultiBitAndGate; // logic add

  private fGate: MultiWayMultiplexerGate;
  private negateFGate: MultiBitNotGate;
  private nGate: MultiWayMultiplexerGate;

  private isNotZeroOrGate: MultiWayOrGate;
  private negateIsNotZero: NotGate;

  constructor(private bitLength: number) {
    super();
    this.zxGate = new MultiWayDeMultiplexerGate(bitLength, 1);
    this.negateZxGate = new MultiBitNotGate(bitLength);
    this.nxGate = new MultiWayMultiplexerGate(bitLength, 1);

    this.zyGate = new MultiWayDeMultiplexerGate(bitLength, 1);
    this.negateZyGate = new MultiBitNotGate(bitLength);
    this.nyGate = new MultiWayMultiplexerGate(bitLength, 1);

    this.additionXYGate = new AdditionGate(bitLength);
    this.andXYGate = new MultiBitAndGate(bitLength);

    this.fGate = new MultiWayMultiplexerGate(bitLength, 1);
    this.negateFGate = new MultiBitNotGate(bitLength);
    this.nGate = new MultiWayMultiplexerGate(bitLength, 1);

    this.isNotZeroOrGate = new MultiWayOrGate(1, bitLength);
    this.negateIsNotZero = new NotGate();
  }

  async eval(inputs: ALUInputs): Promise<ALUOutputs> {
    const [[x, y], [zx, nx, zy, ny, f, n]] = inputs;

    if (x.length !== this.bitLength)
      throw new Error(
        `x have incorrect length, is (${x.length}) but should be (${this.bitLength})`
      );

    if (y.length !== this.bitLength)
      throw new Error(
        `y have incorrect length, is (${y.length}) but should be (${this.bitLength})`
      );

    // calculate if zx or pass x as it is
    const afterZx = await this.zxGate.eval([x, [zx]]).then(([bits]) => bits);

    // calculate the nigation if x so if flag (nx) then we will pass its value
    const negateZX = await this.negateZxGate
      .eval([afterZx])
      .then(([bits]) => bits);

    // choose between the values (negateZx) and (afterZx) from flag (nx)
    const afterNx = await this.nxGate
      .eval([[afterZx, negateZX], [nx]])
      .then(([bits]) => bits);

    // calculate if zy or pass y as it is
    const afterZy = await this.zyGate.eval([y, [zy]]).then(([bits]) => bits);

    // calculate the nigation if y so if flag (ny) then we will pass its value
    const negateZy = await this.negateZyGate
      .eval([afterZy])
      .then(([bits]) => bits);

    // choose between the values (negateZy) and (afterZy) from flag (ny)
    const afterNy = await this.nyGate
      .eval([[afterZy, negateZy], [ny]])
      .then(([bits]) => bits);

    const additionXY = await this.additionXYGate
      .eval([afterNx, afterNy])
      .then(([bits]) => bits);

    const andXY = await this.andXYGate
      .eval([afterNx, afterNy])
      .then(([bits]) => bits);

    const afterF = await this.fGate
      .eval([[andXY, additionXY], [f]])
      .then(([bits]) => bits);

    const negateAfterF = await this.negateFGate
      .eval([afterF])
      .then(([bits]) => bits);

    const afterN = await this.nGate
      .eval([[afterF, negateAfterF], [n]])
      .then(([bits]) => bits);

    // just for convintion will name it (out)
    const out = afterN;

    const zr = await this.negateIsNotZero
      .eval([
        await this.isNotZeroOrGate
          .eval(out.map((bit) => [bit]))
          .then(([[bit]]) => bit),
      ])
      .then(([bit]) => bit);

    const ng = out[0];

    return [[afterN], [zr, ng]];
  }

  evalSync(inputs: ALUInputs): ALUOutputs {
    const [[x, y], [zx, nx, zy, ny, f, n]] = inputs;

    if (x.length !== this.bitLength)
      throw new Error(
        `x have incorrect length, is (${x.length}) but should be (${this.bitLength})`
      );

    if (y.length !== this.bitLength)
      throw new Error(
        `y have incorrect length, is (${y.length}) but should be (${this.bitLength})`
      );

    // calculate if zx or pass x as it is
    const afterZx = this.zxGate.evalSync([x, [zx]])[0];

    // calculate the nigation if x so if flag (nx) then we will pass its value
    const negateZX = this.negateZxGate.evalSync([afterZx])[0];

    // choose between the values (negateZx) and (afterZx) from flag (nx)
    const afterNx = this.nxGate.evalSync([[afterZx, negateZX], [nx]])[0];

    // calculate if zy or pass y as it is
    const afterZy = this.zyGate.evalSync([y, [zy]])[0];

    // calculate the nigation if y so if flag (ny) then we will pass its value
    const negateZy = this.negateZyGate.evalSync([afterZy])[0];

    // choose between the values (negateZy) and (afterZy) from flag (ny)
    const afterNy = this.nyGate.evalSync([[afterZy, negateZy], [ny]])[0];

    const additionXY = this.additionXYGate.evalSync([afterNx, afterNy])[0];

    const andXY = this.andXYGate.evalSync([afterNx, afterNy])[0];

    const afterF = this.fGate.evalSync([[andXY, additionXY], [f]])[0];

    const negateAfterF = this.negateFGate.evalSync([afterF])[0];

    const afterN = this.nGate.evalSync([[afterF, negateAfterF], [n]])[0];

    // just for convintion will name it (out)
    const out = afterN;

    const temp: [Bit] = this.isNotZeroOrGate.evalSync(
      out.map((bit) => [bit])
    )[0] as [Bit];

    const zr = this.negateIsNotZero.evalSync(temp)[0];

    const ng = out[0];

    return [[afterN], [zr, ng]];
  }
}
