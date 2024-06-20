import { VM_ARETHMATIC, VM_INTRUCTION_TYPE } from "../../types";

export class VMParser {
  constructor(private code: string) {}

  private current_instruction: string | undefined = undefined;
  private current_instruction_type: VM_INTRUCTION_TYPE | undefined = undefined;
  private current_index: number = 0;

  hasMoreLines(): boolean {
    return this.current_index < this.code.length;
  }

  advance() {
    // skip before
    this.skip();

    // TODO: should handle the case when no instruction is provided

    // assign the current index to be instruction start
    const start_index = this.current_index;

    // add entries
    while (!this.isNLine(this.code[this.current_index])) this.current_index++;

    // assign the current index to be instruction end
    const end_index = this.current_index;

    const instruction = this.code.slice(start_index, end_index);
    this.current_instruction = instruction;

    // decide type of instruction
    if (this.current_instruction?.startsWith("push")) {
      this.current_instruction_type = VM_INTRUCTION_TYPE.C_PUSH;
    } else if (this.current_instruction?.startsWith("pop")) {
      this.current_instruction_type = VM_INTRUCTION_TYPE.C_POP;
    } else if (
      this.current_instruction?.startsWith(VM_ARETHMATIC.add) ||
      this.current_instruction?.startsWith(VM_ARETHMATIC.sub) ||
      this.current_instruction?.startsWith(VM_ARETHMATIC.neg) ||
      this.current_instruction?.startsWith(VM_ARETHMATIC.eq) ||
      this.current_instruction?.startsWith(VM_ARETHMATIC.neq) ||
      this.current_instruction?.startsWith(VM_ARETHMATIC.lt) ||
      this.current_instruction?.startsWith(VM_ARETHMATIC.lte) ||
      this.current_instruction?.startsWith(VM_ARETHMATIC.gt) ||
      this.current_instruction?.startsWith(VM_ARETHMATIC.gte)
    ) {
      this.current_instruction_type = VM_INTRUCTION_TYPE.C_ARETHMATIC;
    } else {
      throw new Error(
        `the instruction ${this.current_instruction} not implemented`
      );
    }

    // skip after
    this.skip();
  }

  arg1(): string {
    const trimmed = this.current_instruction?.trim();
    const splitted: string[] = (trimmed as string)?.split(" ");
    if (
      this.current_instruction_type === VM_INTRUCTION_TYPE.C_PUSH ||
      this.current_instruction_type === VM_INTRUCTION_TYPE.C_POP
    ) {
      return splitted[1];
    } else if (
      this.current_instruction_type === VM_INTRUCTION_TYPE.C_ARETHMATIC
    ) {
      return splitted[0];
    } else {
      throw new Error(
        `unimplemented arg1 for ${this.current_instruction_type}`
      );
    }
  }

  arg2(): string {
    const trimmed = this.current_instruction?.trim();
    const splitted: string[] = (trimmed as string)?.split(" ");
    if (
      this.current_instruction_type === VM_INTRUCTION_TYPE.C_PUSH ||
      this.current_instruction_type === VM_INTRUCTION_TYPE.C_POP
    ) {
      return splitted[2];
    } else if (
      this.current_instruction_type === VM_INTRUCTION_TYPE.C_ARETHMATIC
    ) {
      throw new Error(`can't use arg2 with C_ARETHMATIC instruction type`);
    } else {
      throw new Error(
        `unimplemented arg2 for ${this.current_instruction_type}`
      );
    }
  }

  instructionType(): VM_INTRUCTION_TYPE {
    return this.current_instruction_type!;
  }

  private isWhiteSpaceOrNLine(symbol: string) {
    return symbol === " " || symbol === "\n";
  }

  private isNLine(symbol: string) {
    return symbol === "\n";
  }

  private skip() {
    while (
      this.isWhiteSpaceOrNLine(this.code[this.current_index]) ||
      this.current_index > this.code.length
    )
      this.current_index++;

    // means its comment
    if (this.code.slice(this.current_index, this.current_index + 2) === "//") {
      while (!this.isNLine(this.code[this.current_index])) this.current_index++;
      this.skip();
    }
  }
}
