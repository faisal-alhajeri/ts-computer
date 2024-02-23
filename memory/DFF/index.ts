import { Bit, Gate } from "../../gate";

export type DFFInputs = [Bit, Bit];
export type DFFOutputs = [Bit];

export class DFF extends Gate<DFFInputs, DFFOutputs> {
  private last_clock: Bit | undefined = undefined;
  private _stored: Bit = 0;
  get stored(): Bit {
    return this._stored;
  }

  // this is added just to make sure if eval happened more than once
  // then the dff gate can handle it
  // for example if clock is 1,1,1 then the will not save new value
  private prev_stored: Bit | undefined = undefined;

  eval(inputs: DFFInputs): DFFOutputs {
    const [inBit, clock] = inputs;

    // // if(clo)

    // if (this.last_value === undefined) {
    //   this.last_clock = clock;
    //   this.last_value = x;
    //   return [0];
    // }

    if (clock === this.last_clock) {
      return [this.prev_stored!];
      // return this.prev_last_value !== undefined ? [this.prev_last_value] : [0];
    }

    const toReturn: [Bit] = [this._stored];
    this.prev_stored = this._stored;
    this._stored = inBit;
    this.last_clock = clock;

    return toReturn;
  }
}
