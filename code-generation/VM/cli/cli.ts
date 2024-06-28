import { readFileSync, writeFileSync, readdirSync } from "fs";
import * as path from "path";
import { VMTranslator } from "../translator";

export class CLI {
  constructor(private filePath: string) {}

  run() {
    const { outputName, files, workingDir } = this.parseFile(this.filePath);

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

  private generate({
    code,
    filename,
  }: {
    filename: string;
    code: string;
  }): string {
    const translator = new VMTranslator();

    translator.code = code;
    translator.filename = filename;

    translator.init();
    translator.translate();
    translator.end();

    const assembly = translator.lines.join("\n");

    console.log({ assembly });

    return assembly;
  }

  private parseFile(filePath: string) {
    const parsed = path.parse(filePath);
    const mode = parsed.ext === "" ? "dir" : "file";

    const workingDir =
      mode === "file" ? parsed.dir : path.join(parsed.dir, parsed.name);

    const outputFile = path.join(workingDir, `${parsed.name}.asm`);
    console.log({ parsed });

    const files =
      mode === "file"
        ? [parsed]
        : readdirSync(workingDir)
            .map((f) => path.parse(f))
            .filter((f) => f.ext === ".vm");

    if (mode === "file") {
      if (parsed.ext !== ".vm") {
        throw new Error("File Extension should be .vm");
      }
    } else {
    }

    console.log({ workingDir, outputFile, files });
    return { workingDir, files, outputName: outputFile };
  }

  private save({ assembly, fileName }: { assembly: string; fileName: string }) {
    writeFileSync(fileName, assembly);
  }
}
