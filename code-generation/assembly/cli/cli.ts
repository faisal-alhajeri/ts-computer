import { readFileSync, writeFileSync } from "fs";
import * as path from "path";
import { HackAssembler } from "../assembler";
export class CLI {
  constructor(private filePath: string) {}

  run() {
    const outPutFile = this.parseFile(this.filePath);

    const assymbly = this.openFile(this.filePath);
    const binary = this.generate(assymbly);
    this.save({ binary, fileName: outPutFile });
  }

  private openFile(name: string): string {
    const content = readFileSync(name).toString();
    console.log({ content });

    return content;
  }

  private generate(assembly: string): string {
    const assembler = new HackAssembler();
    assembler.addCode(assembly);
    const binary = assembler.generate();

    console.log({ binary });

    return binary;
  }

  private parseFile(filePath: string): string {
    const parsed = path.parse(filePath);

    if (parsed.ext !== ".asm") {
      throw new Error("File Extension should be .asm");
    }

    // console.log({ fmt1: path.join(parsed.dir, `${parsed.name}.hack`) });

    // parsed.ext = ".hack";
    // parsed.base = `${parsed.name}.hack`;

    const outPutFile = path.join(parsed.dir, `${parsed.name}.hack`);
    console.log({ outPutFile });

    return outPutFile;
  }

  private save({ binary, fileName }: { binary: string; fileName: string }) {
    writeFileSync(fileName, binary);
  }
}
