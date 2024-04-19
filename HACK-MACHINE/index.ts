import { Bit, BitArray } from "../componenets/gate";
import { RAM } from "../componenets/memory/RAM";
import { CPU } from "./CPU";

export class HackMachine {
  private cpu: CPU = new CPU();
  private ram: RAM = new RAM(16, 15);
  private rom: RAM = new RAM(16, 15);
  private _clock: Bit = 0;
  get clock(): Bit {
    this._clock = (this._clock ^ 1) as Bit;
    return this._clock;
  }

  async run() {
    let inM: BitArray = new Array(16).fill(0);
    let loadM: Bit = 0;
    let pc: BitArray = new Array(16).fill(0);
    let addressM: BitArray = new Array(16).fill(0);

    while (true) {
      // tik new clock
      const clock = this.clock;

      [inM] = await this.ram.eval([inM, loadM, addressM, clock]);
      let [instruction] = await this.rom.eval([pc, 0, pc, clock]);

      [inM, loadM, addressM, pc] = await this.cpu.eval([
        inM,
        instruction,
        0,
        clock,
      ]);
    }
  }

  async loadRAM({ binary }: { binary: BitArray[] }) {
    this.ram.load({ binary, offset: 0 });
  }

  async loadROM({ binary }: { binary: BitArray[] }) {
    this.rom.load({ binary, offset: 0 });
  }
}
