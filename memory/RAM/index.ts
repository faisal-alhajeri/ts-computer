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
  constructor(private bitLength: number, selectorBits: number) {
    super();
    this.ramSize = Math.pow(selectorBits, 2);
    // if (Math.floor(this.selectrBits) !== this.selectrBits)
    //   throw new Error(`ram size should be power of 2, given (${ramsize})`);

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

  eval(inputs: RAMInputs): RAMOutputs {
    const [inBits, load, address, clock] = inputs;

    if (inBits.length !== this.bitLength) {
      throw new Error(
        `number of bits in register is not right, need (${this.bitLength}) and we have (${inBits.length})`
      );
    }

    const loadAfterDemultiplexer: BitArray[] = this.loadDemultiplexer.eval([
      [load],
      address,
    ]);

    const resultOfRegisterIn: BitArray[] = [];
    for (let i = 0; i < this.registers.length; i++) {
      const toLoad: Bit = loadAfterDemultiplexer[i][0];
      resultOfRegisterIn[i] = this.registers[i].eval([
        inBits,
        toLoad,
        clock,
      ])[0];
    }

    const afreMulti: BitArray = this.outPutMultiplexer.eval([
      resultOfRegisterIn,
      address,
    ])[0];

    return [afreMulti];
  }
}
