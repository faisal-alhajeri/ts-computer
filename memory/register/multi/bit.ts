import { Register } from "..";
import { Bit, BitArray, Gate } from "../../../gate";
import { MultiplexerGate } from "../../../gate/derived/multiplexer";
import { MultiBitMultiplexerGate } from "../../../gate/derived/multiplexer/multi/bit";
import { DFF } from "../../DFF";

// inputs: in, load, clock
export type MultiBitRegisterInputs = [BitArray, Bit, Bit];
export type MultiBitRegisterOutputs = [BitArray];

export class MultiBitRegister extends Gate<
  MultiBitRegisterInputs,
  MultiBitRegisterOutputs
> {
  private registers: Register[];

  public get stored(): BitArray {
    return this.registers.map((r) => r.stored);
  }

  constructor(private bits: number) {
    super();
    this.registers = new Array(bits).fill(0).map(() => new Register());
  }

  //   private lastResultMultiplexer: MultiplexerGate = new MultiplexerGate();

  async eval(inputs: MultiBitRegisterInputs): Promise<MultiBitRegisterOutputs> {
    const [inBits, load, clock] = inputs;

    if (inBits.length !== this.bits) {
      throw new Error(
        `number of bits in register is not right, need (${this.bits}) and we have (${inBits.length})`
      );
    }

    const result: BitArray = await Promise.all(
      this.registers.map(
        async (gate, idx) =>
          await gate.eval([inBits[idx], load, clock]).then(([bit]) => bit)
      )
    );

    return [result];
  }
}
