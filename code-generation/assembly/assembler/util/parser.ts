export class Parser {
  constructor(private code: string) {}

  private current_instruction: string | undefined = undefined;
  private current_instruction_type: INTRUCTION_TYPE | undefined = undefined;
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
    if (this.current_instruction?.startsWith("@")) {
      this.current_instruction_type = INTRUCTION_TYPE.A_INSTRUCTION;
    } else if (this.current_instruction?.startsWith("(")) {
      this.current_instruction_type = INTRUCTION_TYPE.L_INSTRUCTION;
    } else {
      this.current_instruction_type = INTRUCTION_TYPE.C_INSTRUCTION;
    }

    // skip after
    this.skip();
  }

  instructionType(): INTRUCTION_TYPE {
    return this.current_instruction_type!;
  }

  symbol(): string {
    const instructionType = this.instructionType();
    if (this.current_instruction === undefined)
      throw new Error("current instruction should not be empty");

    if (instructionType === INTRUCTION_TYPE.A_INSTRUCTION) {
      return this.current_instruction!.slice(1);
    } else if (instructionType === INTRUCTION_TYPE.L_INSTRUCTION) {
      return this.current_instruction!.slice(
        1,
        this.current_instruction!.length - 1
      );
    } else {
      throw new Error("symbol should be only in (A) and (L) instructions");
    }
  }

  dest(): string | undefined {
    const instructionType = this.instructionType();
    if (this.current_instruction === undefined)
      throw new Error("current instruction should not be empty");

    if (instructionType === INTRUCTION_TYPE.C_INSTRUCTION) {
      return this.slice({ data: this.current_instruction, endSymbol: "=" });
    } else {
      throw new Error("symbol should be only in (C) instruction");
    }
  }

  comp(): string {
    const instructionType = this.instructionType();
    if (this.current_instruction === undefined)
      throw new Error("current instruction should not be empty");

    if (instructionType === INTRUCTION_TYPE.C_INSTRUCTION) {
      let result = this.current_instruction;

      const without_comp = this.slice({
        data: result,
        startSymbol: "=",
      });

      result = without_comp === undefined ? result : without_comp;

      const without_jump = this.slice({
        data: result,
        endSymbol: ";",
      });

      result = without_jump === undefined ? result : without_jump;

      return result;
    } else {
      throw new Error("symbol should be only in (C) instruction");
    }
  }

  jump(): string | undefined {
    const instructionType = this.instructionType();
    if (this.current_instruction === undefined)
      throw new Error("current instruction should not be empty");

    if (instructionType === INTRUCTION_TYPE.C_INSTRUCTION) {
      return this.slice({ data: this.current_instruction, startSymbol: ";" });
    } else {
      throw new Error("symbol should be only in (C) instruction");
    }
  }

  private slice({
    data,
    endSymbol,
    startSymbol,
  }: {
    data: string;
    startSymbol?: string;
    endSymbol?: string;
  }): string | undefined {
    let start = 0;
    let end = data.length - 1;

    if (startSymbol !== undefined) {
      while (data[start] !== startSymbol && start < end) start++;
      start++;
    }

    while (this.isWhiteSpaceOrNLine(data[start])) start++;

    if (endSymbol !== undefined) {
      while (data[end] !== endSymbol && end > start) end--;
      end--;
    }

    while (this.isWhiteSpaceOrNLine(data[end]) && end > start) end--;

    if (start === end + 1) return undefined;

    return data.slice(start, end + 1);
  }

  private isWhiteSpaceOrNLine(symbol: string) {
    return symbol === " " || symbol === "\n";
  }

  private isNLine(symbol: string) {
    return symbol === "\n";
  }

  private skip() {
    while (this.isWhiteSpaceOrNLine(this.code[this.current_index]))
      this.current_index++;

    // means its comment
    if (this.code.slice(this.current_index, this.current_index + 2) === "//") {
      while (!this.isNLine(this.code[this.current_index])) this.current_index++;
      this.skip();
    }
  }
}

export enum INTRUCTION_TYPE {
  A_INSTRUCTION = "A_INSTRUCTION",
  C_INSTRUCTION = "C_INSTRUCTION",
  L_INSTRUCTION = "L_INSTRUCTION",
}
