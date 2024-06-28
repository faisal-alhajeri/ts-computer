import { VM_ARETHMATIC, VM_INTRUCTION_TYPE, VM_SEGMENT } from "../types";
import { VMCodeGenerator } from "../util/code-gen";
import { VMParser } from "../util/parser";

const BASE_FILE_NAME = "VM_BASE";
const END_LABEL = "END";

export class VMTranslator {
  private _code: string | undefined;
  private _filename: string | undefined;

  private _lines: string[] = [];
  get lines(): string[] {
    return [...this._lines];
  }

  set filename(f: string) {
    this._filename = f;
  }

  set code(code: string) {
    this._code = code;
  }

  init() {
    const codeGen = new VMCodeGenerator({ filename: BASE_FILE_NAME });
    this._lines.push(
      //
      `// init vars`,
      `@256`,
      `D = A`,
      `@SP`,
      `M = D`,
      "\n",
      ...codeGen.writePushPop({
        type: VM_INTRUCTION_TYPE.C_PUSH,
        segment: VM_SEGMENT.CONSTANT,
        index: "0",
      }),
      ...codeGen.writeCall({ name: "Main.main", nVars: 1 }),
      ...codeGen.writeGoto({ label: END_LABEL })
    );
  }

  end() {
    const codeGen = new VMCodeGenerator({ filename: BASE_FILE_NAME });
    this._lines.push(
      // convition for ending the program
      ...codeGen.writeLabel({ label: END_LABEL }),
      ...codeGen.writeGoto({ label: END_LABEL }),
      `\n`
    );
  }

  translate() {
    if (this._code === undefined)
      throw new Error(`no code added to translator`);
    if (this._filename === undefined)
      throw new Error(`no filename added to translator`);

    const parser = new VMParser(this._code);
    const codeGen = new VMCodeGenerator({ filename: this._filename });

    while (parser.hasMoreLines()) {
      parser.advance();

      switch (parser.instructionType()) {
        case VM_INTRUCTION_TYPE.C_ARETHMATIC:
          this._lines.push(
            ...codeGen.writeArethmatic({
              command: parser.arg1() as VM_ARETHMATIC,
            })
          );
          break;
        case VM_INTRUCTION_TYPE.C_PUSH:
          this._lines.push(
            ...codeGen.writePushPop({
              type: VM_INTRUCTION_TYPE.C_PUSH,
              segment: parser.arg1() as VM_SEGMENT,
              index: parser.arg2(),
            })
          );
          break;
        case VM_INTRUCTION_TYPE.C_POP:
          this._lines.push(
            ...codeGen.writePushPop({
              type: VM_INTRUCTION_TYPE.C_POP,
              segment: parser.arg1() as VM_SEGMENT,
              index: parser.arg2(),
            })
          );
          break;
        case VM_INTRUCTION_TYPE.C_GOTO:
          this._lines.push(
            ...codeGen.writeGoto({
              label: parser.arg1(),
            })
          );
          break;
        case VM_INTRUCTION_TYPE.C_IF:
          this._lines.push(
            ...codeGen.writeIf({
              label: parser.arg1(),
            })
          );
          break;
        case VM_INTRUCTION_TYPE.C_LABEL:
          this._lines.push(
            ...codeGen.writeLabel({
              label: parser.arg1(),
            })
          );
          break;
        case VM_INTRUCTION_TYPE.C_FUNCTION:
          this._lines.push(
            ...codeGen.writeFunction({
              name: parser.arg1(),
              nVars: parseInt(parser.arg2()),
            })
          );
          break;
        case VM_INTRUCTION_TYPE.C_CALL:
          this._lines.push(
            ...codeGen.writeCall({
              name: parser.arg1(),
              nVars: parseInt(parser.arg2()),
            })
          );
          break;
        case VM_INTRUCTION_TYPE.C_RETURN:
          this._lines.push(...codeGen.writeReturn());
          break;

        default:
          throw new Error(`unimplemented case (${parser.instructionType()})`);
      }
    }
  }
}
