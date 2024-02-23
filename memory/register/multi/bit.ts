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

  constructor(private bits: number) {
    super();
    this.registers = new Array(bits).fill(0).map(() => new Register());
  }

  //   private lastResultMultiplexer: MultiplexerGate = new MultiplexerGate();

  eval(inputs: MultiBitRegisterInputs): MultiBitRegisterOutputs {
    const [inBits, load, clock] = inputs;

    if (inBits.length !== this.bits) {
      throw new Error(
        `number of bits in register is not right, need (${this.bits}) and we have (${inBits.length})`
      );
    }

    const result: BitArray = [];
    for (let i = 0; i < this.bits; i++) {
      const register = this.registers[i];
      const bit = inBits[i];
      result[i] = register.eval([bit, load, clock])[0];
    }

    return [result];
  }
}
