import { readFileSync, writeFileSync } from "fs";
import * as path from "path";
import { VMTranslator } from "../translator";

export class CLI {
  constructor(private filePath: string) {}

  run() {
    const { fullName, name } = this.parseFile(this.filePath);

    const code = this.openFile(this.filePath);
    const assembly = this.generate({ code, filename: name });
    this.save({ assembly, fileName: fullName });
  }

  private openFile(name: string): string {
    const content = readFileSync(name).toString();
    console.log({ content });

    return content;
  }

  private generate({
    code,
    filename,
  }: {
    filename: string;
    code: string;
  }): string {
    const translator = new VMTranslator({ filename, code });

    const assembly = translator.translate().join("\n");

    console.log({ assembly });

    return assembly;
  }

  private parseFile(filePath: string) {
    const parsed = path.parse(filePath);

    if (parsed.ext !== ".vm") {
      throw new Error("File Extension should be .vm");
    }

    const outPutFile = path.join(parsed.dir, `${parsed.name}.asm`);
    console.log({ outPutFile });

    return { name: parsed.name, fullName: outPutFile };
  }

  private save({ assembly, fileName }: { assembly: string; fileName: string }) {
    writeFileSync(fileName, assembly);
  }
}
