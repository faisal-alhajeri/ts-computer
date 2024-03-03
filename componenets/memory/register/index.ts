import { Bit, Gate } from "../../gate";
import { MultiplexerGate } from "../../gate/derived/multiplexer";
import { DFF } from "../DFF";

// inputs: in, load, clock
export type RegisterInputs = [Bit, Bit, Bit];
export type RegisterOutputs = [Bit];

export class Register extends Gate<RegisterInputs, RegisterOutputs> {
  private dff: DFF = new DFF();
  private loadMultiplexer: MultiplexerGate = new MultiplexerGate();

  public get stored() {
    return this.dff.stored;
  }

  async eval(inputs: RegisterInputs): Promise<RegisterOutputs> {
    const [inBit, load, clock] = inputs;
    const toFeedDFF: Bit = await this.loadMultiplexer
      .eval([[this.dff.stored, inBit], load])
      .then(([bit]) => bit);

    const result: Bit = await this.dff
      .eval([toFeedDFF, clock])
      .then(([bit]) => bit);

    return [result];
  }
}
