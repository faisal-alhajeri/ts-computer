import { VM_ARETHMATIC, VM_INTRUCTION_TYPE, VM_SEGMENT } from "../types";
import { VMCodeGenerator } from "../util/code-gen";
import { VMParser } from "../util/parser";

export class VMTranslator {
  private code: string;
  private filename: string;

  constructor(props: { code: string; filename: string }) {
    this.code = props.code;
    this.filename = props.filename;
  }

  translate() {
    if (this.code === undefined) throw new Error(`no code added to translator`);

    const parser = new VMParser(this.code);
    const codeGen = new VMCodeGenerator({ filename: this.filename });

    const lines: string[] = [
      //
      `// init vars`,
      `@256`,
      `D = A`,
      `@SP`,
      `M = D`,
    ];

    while (parser.hasMoreLines()) {
      parser.advance();

      switch (parser.instructionType()) {
        case VM_INTRUCTION_TYPE.C_ARETHMATIC:
          lines.push(
            ...codeGen.writeArethmatic({
              command: parser.arg1() as VM_ARETHMATIC,
            })
          );
          break;
        case VM_INTRUCTION_TYPE.C_PUSH:
          lines.push(
            ...codeGen.writePushPop({
              type: VM_INTRUCTION_TYPE.C_PUSH,
              segment: parser.arg1() as VM_SEGMENT,
              index: parser.arg2(),
            })
          );
          break;
        case VM_INTRUCTION_TYPE.C_POP:
          lines.push(
            ...codeGen.writePushPop({
              type: VM_INTRUCTION_TYPE.C_POP,
              segment: parser.arg1() as VM_SEGMENT,
              index: parser.arg2(),
            })
          );
          break;
        case VM_INTRUCTION_TYPE.C_GOTO:
          lines.push(
            ...codeGen.writeGoto({
              label: parser.arg1(),
            })
          );
          break;
        case VM_INTRUCTION_TYPE.C_IF:
          lines.push(
            ...codeGen.writeIf({
              label: parser.arg1(),
            })
          );
          break;
        case VM_INTRUCTION_TYPE.C_LABEL:
          lines.push(
            ...codeGen.writeLabel({
              label: parser.arg1(),
            })
          );
          break;
        case VM_INTRUCTION_TYPE.C_FUNCTION:
          lines.push(
            ...codeGen.writeFunction({
              name: parser.arg1(),
              nVars: parseInt(parser.arg2()),
            })
          );
          break;
        case VM_INTRUCTION_TYPE.C_CALL:
          lines.push(
            ...codeGen.writeCall({
              name: parser.arg1(),
              nVars: parseInt(parser.arg2()),
            })
          );
          break;
        case VM_INTRUCTION_TYPE.C_RETURN:
          lines.push(...codeGen.writeReturn());
          break;

        default:
          throw new Error(`unimplemented case (${parser.instructionType()})`);
      }
    }

    lines.push(
      // convition for ending the program
      `(END)`,
      `@END`,
      `0; JMP`,
      `\n`
    );
    return lines;
  }
}
