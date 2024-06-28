import { HackMachine } from "..";
import { readFileSync, writeFileSync } from "fs";
import * as path from "path";
import { Bit } from "../../componenets/gate";

export class HackCliRunner {
  constructor(private filePath: string) {}

  public readonly machine = new HackMachine();

  async run({ rounds }: { rounds: number }) {
    const bin = this.loadBin();
    const binLenght = bin.length;

    let i = 0;
    while (this.binToInt(this.machine.pc) < binLenght) {
      await this.machine.round();
      i++;
    }
    console.log({ rounds: i });
  }

  runSync({ rounds }: { rounds: number }) {
    const bin = this.loadBin();
    const binLenght = bin.length;
    console.log({ binLenght });

    let i = 0;
    while (this.binToInt(this.machine.pc) < binLenght - 1) {
      // console.log({ pc: this.binToInt(this.machine.pc) });

      this.machine.roundSync();
      // await sleep(100);
      i++;
    }

    console.log({ rounds: i });
  }

  private binToInt(bin: Bit[]): number {
    return parseInt(bin.join(""), 2);
  }

  private loadBin() {
    const file = readFileSync(this.filePath).toString();
    const bin = file
      .split("\n")
      .map((bin) => bin.split("").map((bit) => parseInt(bit) as Bit));

    // this.machine.reset();
    this.machine.loadROM({ binary: bin });

    return bin;
  }
}

async function sleep(time: number) {
  return await new Promise((res) => setTimeout(res, time));
}
