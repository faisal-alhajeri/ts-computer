import { Bit, Gate } from "../../gate";
import { MultiplexerGate } from "../../gate/derived/multiplexer";
import { DFF } from "../DFF";

// inputs: in, load, clock
export type RegisterInputs = [Bit, Bit, Bit];
export type RegisterOutputs = [Bit];

export class Register extends Gate<RegisterInputs, RegisterOutputs> {
  private dff: DFF = new DFF();
  private loadMultiplexer: MultiplexerGate = new MultiplexerGate();
  //   private lastResultMultiplexer: MultiplexerGate = new MultiplexerGate();

  eval(inputs: RegisterInputs): RegisterOutputs {
    const [inBit, load, clock] = inputs;
    const toFeedDFF: Bit = this.loadMultiplexer.eval([
      [this.dff.stored, inBit],
      load,
    ])[0];

    const result: Bit = this.dff.eval([toFeedDFF, clock])[0];

    return [result];
  }
}
