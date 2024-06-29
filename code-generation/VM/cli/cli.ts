import { readFileSync, writeFileSync, readdirSync } from "fs";
import * as path from "path";
import { VMTranslator } from "../translator";

export class CLI {
  constructor(private path: string) {}

  run() {
    const mode = this.parsePath({ path: this.path });

    const lines =
      mode.mode === "dir"
        ? this.genDir({ files: mode.files, workingDir: mode.workingDir })
        : this.genFile({ file: mode.file, workingDir: mode.workingDir });

    const assembly = lines.join("\n");
    this.save({ assembly, fileName: mode.outputFile });
  }

  private openFile(name: string): string {
    const content = readFileSync(name).toString();
    console.log({ content });

    return content;
  }

  private parsePath({ path: _path }: { path: string }): ParsedPath {
    const parsed = path.parse(_path);

    if (parsed.ext === "") {
      const workingDir = path.join(parsed.dir, parsed.name);
      return {
        mode: "dir",
        workingDir: workingDir,
        files: readdirSync(workingDir)
          .map((f) => path.parse(f))
          .filter((f) => f.ext === ".vm")
          .map((f) => f.name),
        outputFile: path.join(workingDir, "Main.asm"),
      };
    } else {
      return {
        mode: "file",
        workingDir: path.join(parsed.dir),
        file: parsed.name,
        outputFile: path.join(parsed.dir, `${parsed.name}.asm`),
      };
    }
  }

  private genFile({ file, workingDir }: { workingDir: string; file: string }) {
    const translator = new VMTranslator();
    const code = this.openFile(path.join(workingDir, `${file}.vm`));
    translator.code = code;
    translator.filename = file;
    translator.translate();

    return translator.lines;
  }

  private genDir({
    files,
    workingDir,
  }: {
    workingDir: string;
    files: string[];
  }) {
    const translator = new VMTranslator();
    translator.initDir();
    files.forEach((filename) => {
      const code = this.openFile(path.join(workingDir, `${filename}.vm`));

      translator.code = code;
      translator.filename = filename;

      translator.translate();
    });
    translator.end();

    return translator.lines;
  }

  private save({ assembly, fileName }: { assembly: string; fileName: string }) {
    writeFileSync(fileName, assembly);
  }
}

type ParsedPath =
  | {
      mode: "dir";
      workingDir: string;
      files: string[];
      outputFile: string;
    }
  | {
      mode: "file";
      workingDir: string;
      file: string;
      outputFile: string;
    };
