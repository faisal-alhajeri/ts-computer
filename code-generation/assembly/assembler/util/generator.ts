import { SymbolTable } from "./symbol-table";

export class CodeGenerator {
  constructor() {}

  //   generate_L_instruction({}: { symbol: string }) {}

  /**
   * generate code for A instructions
   *
   * we assume symbol is a number, the label resolve should be done
   * in another layer
   *
   * @returns binary code
   */
  generate_A_instruction({ symbol }: { symbol: string }): string {
    const as_num = parseInt(symbol);

    if (isNaN(as_num)) throw new Error(`${symbol} is not a number`);

    const as_binary = (as_num % 32768).toString(2).padStart(15, "0");

    return `0${as_binary}`;
  }

  /**
   * generate code for C instructions
   *
   *
   * @returns binary code
   */
  generate_C_instruction({
    comp,
    dest,
    jump,
  }: {
    dest: string | undefined;
    comp: string;
    jump: string | undefined;
  }): string {
    const dest_result = this.c_generate_dest(dest);
    const comp_result = this.c_generate_comp(comp);
    const jump_result = this.c_generate_jump(jump);

    return `111${comp_result}${dest_result}${jump_result}`;
  }

  private c_generate_dest(dest: string | undefined) {
    const dest_result = ["0", "0", "0"];

    if (dest !== undefined) {
      Array.from(dest).forEach((d) => {
        const index = DEST_INDEX[d as DEST_KEYS];

        if (index === undefined)
          throw new Error(`no vatiaron found for dest (${dest})`);

        dest_result[index] = "1";
      });
    }

    return dest_result.join("");
  }

  private c_generate_jump(jump: string | undefined) {
    if (jump === undefined) return "000";

    const result = JUMP_RESOLVE[jump as JUMP_KEYS];

    if (result === undefined)
      throw new Error(`no vatiaron found for jump (${jump})`);

    return result;
  }

  private c_generate_comp(comp: string) {
    const result = COMP_RESOLVE[comp as COMP_KEYS];

    if (result === undefined)
      throw new Error(`no vatiaron found for comp (${comp})`);

    return result;
  }
}

const DEST_INDEX: Record<DEST_KEYS, number> = {
  A: 0,
  D: 1,
  M: 2,
} as const;

const COMP_RESOLVE: Record<COMP_KEYS, string> = {
  "0": "0101010",
  "1": "0111111",
  "-1": "0111010",
  D: "0001100",
  A: "0110000",
  "!D": "0001101",
  "!A": "0110001",
  "-D": "0001111",
  "-A": "0110011",
  "D+1": "0011111",
  "A+1": "0110111",
  "D-1": "0001110",
  "A-1": "0110010",
  "D+A": "0000010",
  "D-A": "0010011",
  "A-D": "0000111",
  "D&A": "0000000",
  "D|A": "0010101",
  M: "1110000",
  "!M": "1110001",
  "-M": "1110011",
  "M+1": "1110111",
  "M-1": "1110010",
  "D+M": "1000010",
  "D-M": "1010011",
  "M-D": "1000111",
  "D&M": "1000000",
  "D|M": "1010101",
} as const;

const JUMP_RESOLVE: Record<JUMP_KEYS, string> = {
  JGT: "001",
  JEQ: "010",
  JGE: "011",
  JLT: "100",
  JNE: "101",
  JLE: "110",
  JMP: "111",
};

type DEST_KEYS = "A" | "M" | "D";

type JUMP_KEYS = "JGT" | "JEQ" | "JGE" | "JLT" | "JNE" | "JLE" | "JMP";

type COMP_KEYS =
  | "0"
  | "1"
  | "-1"
  | "D"
  | "A"
  | "!D"
  | "!A"
  | "-D"
  | "-A"
  | "D+1"
  | "A+1"
  | "D-1"
  | "A-1"
  | "D+A"
  | "D-A"
  | "A-D"
  | "D&A"
  | "D|A"
  | "M"
  | "!M"
  | "-M"
  | "M+1"
  | "M-1"
  | "D+M"
  | "D-M"
  | "M-D"
  | "D&M"
  | "D|M";
