import { HackMachine } from "..";
import { readFileSync, writeFileSync } from "fs";
import * as path from "path";
import { Bit } from "../../componenets/gate";

export class HackCliRunner {
  constructor(private filePath: string) {}

  public readonly machine = new HackMachine();

  async run({ rounds }: { rounds: number }) {
    const file = readFileSync(this.filePath).toString();
    const bin = file
      .split("\n")
      .map((bin) => bin.split("").map((bit) => parseInt(bit) as Bit));

    // this.machine.reset();
    this.machine.loadROM({ binary: bin });
    let i = 0;
    while (i < rounds) {
      await this.machine.round();
      i++;
    }
  }
}
