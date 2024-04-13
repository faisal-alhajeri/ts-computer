import { CodeGenerator } from "./util/generator";
import { INTRUCTION_TYPE, Parser } from "./util/parser";
import { SymbolTable } from "./util/symbol-table";

export class HackAssembler {
  private code: string | undefined = undefined;
  private symbolTable: SymbolTable = new SymbolTable();
  private codeGenerator: CodeGenerator = new CodeGenerator();

  addCode(code: string) {
    this.code = code;
  }

  generate(): string {
    if (this.code === undefined) throw new Error("no code to generate");

    this.firstRun(this.code);

    return this.secondRun(this.code);
  }

  private firstRun(code: string) {
    const parser = new Parser(code);

    let lineNum = 0;
    while (parser.hasMoreLines()) {
      parser.advance();

      if (parser.instructionType() === INTRUCTION_TYPE.L_INSTRUCTION) {
        const symbol = parser.symbol();
        this.symbolTable.addEntry({ address: lineNum.toString(), symbol });
      } else {
        lineNum++;
      }
    }
  }

  private secondRun(code: string) {
    const parser = new Parser(code);

    const lines: string[] = [];
    while (parser.hasMoreLines()) {
      parser.advance();

      if (parser.instructionType() === INTRUCTION_TYPE.A_INSTRUCTION) {
        const symbol = parser.symbol();
        const isLabel = this.isLabel(symbol);

        const address = isLabel
          ? this.symbolTable.getAddress({ symbol })
          : symbol;

        const line = this.codeGenerator.generate_A_instruction({
          symbol: address,
        });

        lines.push(line);
      } else if (parser.instructionType() === INTRUCTION_TYPE.C_INSTRUCTION) {
        const dest = parser.dest();
        const comp = parser.comp();
        const jump = parser.jump();

        const line = this.codeGenerator.generate_C_instruction({
          comp,
          dest,
          jump,
        });

        lines.push(line);
      }
    }

    return lines.join("\n");
  }

  private isLabel(symbol: string): boolean {
    const as_num = parseInt(symbol);

    if (isNaN(as_num)) return true;
    else return false;
  }
}
