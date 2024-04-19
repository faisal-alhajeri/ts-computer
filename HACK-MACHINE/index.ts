import { Bit, BitArray } from "../componenets/gate";
import { RAM } from "../componenets/memory/RAM";
import { CPU } from "./CPU";

export class HackMachine {
  private cpu: CPU = new CPU();
  private ram: RAM = new RAM(16, 15);
  private rom: RAM = new RAM(16, 15);

  private inM: BitArray = new Array(16).fill(0);
  private loadM: Bit = 0;
  private pc: BitArray = new Array(16).fill(0);
  private addressM: BitArray = new Array(16).fill(0);

  private _clock: Bit = 0;
  get clock(): Bit {
    this._clock = (this._clock ^ 1) as Bit;
    return this._clock;
  }

  async round() {
    // tik new clock
    const clock = this.clock;

    [this.inM] = await this.ram.eval([
      this.inM,
      this.loadM,
      this.addressM,
      clock,
    ]);
    let [instruction] = await this.rom.eval([this.pc, 0, this.pc, clock]);

    [this.inM, this.loadM, this.addressM, this.pc] = await this.cpu.eval([
      this.inM,
      instruction,
      0,
      clock,
    ]);
  }

  async run() {
    while (true) {
      await this.round();
    }
  }

  async loadRAM({ binary }: { binary: BitArray[] }) {
    this.ram.load({ binary, offset: 0 });
  }

  async loadROM({ binary }: { binary: BitArray[] }) {
    this.rom.load({ binary, offset: 0 });
  }
}
