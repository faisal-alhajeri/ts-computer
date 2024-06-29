import { readFileSync, writeFileSync, readdirSync } from "fs";
import * as path from "path";
import { VMTranslator } from "../translator";

export class CLI {
  constructor(private dirPath: string) {}

  run() {
    const { outputName, files, workingDir } = this.parseFile(this.dirPath);

    const translator = new VMTranslator();
    translator.init();
    files.forEach((filename) => {
      const code = this.openFile(
        path.join(workingDir, `${filename.name}${filename.ext}`)
      );

      translator.code = code;
      translator.filename = filename.name;

      translator.translate();
    });
    translator.end();
    const assembly = translator.lines.join("\n");
    this.save({ assembly, fileName: outputName });
  }

  private openFile(name: string): string {
    const content = readFileSync(name).toString();
    console.log({ content });

    return content;
  }

  private parseFile(filePath: string) {
    const parsed = path.parse(filePath);

    const workingDir = path.join(parsed.dir, parsed.name);

    const outputFile = path.join(workingDir, `Main.asm`);

    const files = readdirSync(workingDir)
      .map((f) => path.parse(f))
      .filter((f) => f.ext === ".vm");

    console.log({ workingDir, outputFile, files });
    return { workingDir, files, outputName: outputFile };
  }

  private save({ assembly, fileName }: { assembly: string; fileName: string }) {
    writeFileSync(fileName, assembly);
  }
}
