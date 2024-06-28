import { AdditionGate } from "../../custom/Addition";
import { Bit, BitArray, Gate } from "../../gate";
import { DeMultiplexerGate } from "../../gate/derived/demultiplexer";
import { MultiBitDeMultiplexerGate } from "../../gate/derived/demultiplexer/multi/bit";
import { MultiWayDeMultiplexerGate } from "../../gate/derived/demultiplexer/multi/ways";
import { MultiBitMultiplexerGate } from "../../gate/derived/multiplexer/multi/bit";
import { MultiWayMultiplexerGate } from "../../gate/derived/multiplexer/multi/ways";
import { OrGate } from "../../gate/derived/or";
import { MultiBitOrGate } from "../../gate/derived/or/multi/bit";
import { MultiWayOrGate } from "../../gate/derived/or/multi/ways";
import { Register } from "../register";
import { MultiBitRegister } from "../register/multi/bit";

// inputs: in, load, inc, reset, clock
export type PCInputs = [BitArray, [Bit, Bit, Bit], Bit];
export type PCOutputs = [BitArray];

export class PC extends Gate<PCInputs, PCOutputs> {
  private register: MultiBitRegister;
  private inMultiplexer: MultiWayMultiplexerGate;
  private additionGate: AdditionGate;
  private registerLoadOr: MultiWayOrGate;

  get stored() {
    return this.register.stored;
  }

  constructor(private bitLength: number) {
    super();
    this.register = new MultiBitRegister(bitLength);
    this.inMultiplexer = new MultiWayMultiplexerGate(bitLength, 3);
    this.additionGate = new AdditionGate(bitLength);
    this.registerLoadOr = new MultiWayOrGate(1, 3);
  }

  async eval([
    inBits,
    [load, inc, reset],
    clock,
  ]: PCInputs): Promise<PCOutputs> {
    const zero = Gate.zero(this.bitLength);
    const one = Gate.zero(this.bitLength);
    one[this.bitLength - 1] = 1;
    const sotred = this.register.stored;

    const addition = await this.additionGate
      .eval([one, sotred])
      .then(([bits]) => bits);

    const afterMulti: BitArray = await this.inMultiplexer
      .eval([
        [inBits, zero, addition, zero, inBits, zero, inBits, zero],
        [load, inc, reset],
      ])
      .then(([bits]) => bits);

    const registerLoad = await this.registerLoadOr
      .eval([[load], [inc], [reset]])
      .then(([[bit]]) => bit);

    return await this.register.eval([afterMulti, registerLoad, clock]);
  }

  evalSync([inBits, [load, inc, reset], clock]: PCInputs): PCOutputs {
    const zero = Gate.zero(this.bitLength);
    const one = Gate.zero(this.bitLength);
    one[this.bitLength - 1] = 1;
    const sotred = this.register.stored;

    const addition = this.additionGate.evalSync([one, sotred])[0];

    const afterMulti: BitArray = this.inMultiplexer.evalSync([
      [inBits, zero, addition, zero, inBits, zero, inBits, zero],
      [load, inc, reset],
    ])[0];

    const registerLoad = this.registerLoadOr.evalSync([
      [load],
      [inc],
      [reset],
    ])[0][0];

    return this.register.evalSync([afterMulti, registerLoad, clock]);
  }

  reset() {
    this.register.load(new Array(16).fill(0));
  }
}
