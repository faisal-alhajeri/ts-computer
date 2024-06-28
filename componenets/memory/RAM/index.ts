import { Bit, BitArray, Gate } from "../../gate";
import { DeMultiplexerGate } from "../../gate/derived/demultiplexer";
import { MultiBitDeMultiplexerGate } from "../../gate/derived/demultiplexer/multi/bit";
import { MultiWayDeMultiplexerGate } from "../../gate/derived/demultiplexer/multi/ways";
import { MultiBitMultiplexerGate } from "../../gate/derived/multiplexer/multi/bit";
import { MultiWayMultiplexerGate } from "../../gate/derived/multiplexer/multi/ways";
import { MultiBitRegister } from "../register/multi/bit";

// inputs: in, load, address, clock
export type RAMInputs = [BitArray, Bit, BitArray, Bit];
export type RAMOutputs = [BitArray];

export class RAM extends Gate<RAMInputs, RAMOutputs> {
  private registers: MultiBitRegister[];
  private loadDemultiplexer: MultiWayDeMultiplexerGate;
  //   private inDemultiplexer: MultiWayDeMultiplexerGate;
  private outPutMultiplexer: MultiWayMultiplexerGate;

  private ramSize: number;
  // ram slots should be power of 2

  private clocks: (Bit | undefined)[];
  private round: number = 0;
  private last_clock: Bit | undefined;

  constructor(private bitLength: number, selectorBits: number) {
    super();
    this.ramSize = Math.pow(2, selectorBits);
    // if (Math.floor(this.selectrBits) !== this.selectrBits)
    //   throw new Error(`ram size should be power of 2, given (${ramsize})`);

    this.clocks = new Array(this.ramSize).fill(0).map(() => undefined);
    this.registers = new Array(this.ramSize)
      .fill(0)
      .map(() => new MultiBitRegister(bitLength));

    this.outPutMultiplexer = new MultiWayMultiplexerGate(
      bitLength,
      selectorBits
    );
    this.loadDemultiplexer = new MultiWayDeMultiplexerGate(1, selectorBits);
    // this.inDemultiplexer = new MultiWayDeMultiplexerGate(
    //   bitLength,
    //   selectorBits
    // );
  }

  //   private lastResultMultiplexer: MultiplexerGate = new MultiplexerGate();

  async eval([inBits, load, address, clock]: RAMInputs): Promise<RAMOutputs> {
    if (inBits.length !== this.bitLength) {
      throw new Error(
        `number of bits in register is not right, need (${this.bitLength}) and we have (${inBits.length})`
      );
    }
    const addressInt = parseInt(
      address.map((bit) => bit.toString()).join(""),
      2
    );
    const register = this.registers[addressInt];

    if (this.last_clock !== undefined && this.last_clock === clock) {
      return [register.stored];
    }

    this.round++;
    this.last_clock = clock;
    const oldRegisterClock = this.clocks[addressInt];
    this.clocks[addressInt] =
      oldRegisterClock === undefined ? clock : ((oldRegisterClock ^ 1) as Bit);

    await register.eval([inBits, load, this.clocks[addressInt] as Bit]);

    return [register.stored];
  }

  evalSync([inBits, load, address, clock]: RAMInputs): RAMOutputs {
    if (inBits.length !== this.bitLength) {
      throw new Error(
        `number of bits in register is not right, need (${this.bitLength}) and we have (${inBits.length})`
      );
    }
    const addressInt = parseInt(
      address.map((bit) => bit.toString()).join(""),
      2
    );
    const register = this.registers[addressInt];

    if (this.last_clock !== undefined && this.last_clock === clock) {
      return [register.stored];
    }

    this.round++;
    this.last_clock = clock;
    const oldRegisterClock = this.clocks[addressInt];
    this.clocks[addressInt] =
      oldRegisterClock === undefined ? clock : ((oldRegisterClock ^ 1) as Bit);

    register.evalSync([inBits, load, this.clocks[addressInt] as Bit]);
    return [register.stored];
  }

  load({ binary, offset }: { binary: BitArray[]; offset: number }) {
    if (offset + binary.length >= this.ramSize)
      throw new Error(
        `cannot load into ram with binary lines (${binary.length}) and offset (${offset})`
      );

    binary.forEach((bin, idx) => {
      const register = this.registers[offset + idx];
      register.load(bin);
    });
  }

  inspect({ offset, length = 1 }: { offset: number; length?: number }) {
    return this.registers.slice(offset, offset + length).map((r) => r.stored);
  }

  private async runByBatches<T>({
    batch,
    args,
    callback,
  }: {
    args: T[];
    batch: number;
    callback: (args: T[], startI: number) => Promise<void>;
  }) {
    let i = 0;
    while (i < args.length) {
      const toRun = args.slice(i, i + batch);

      await callback(toRun, i);

      i += batch;
    }
  }
}
