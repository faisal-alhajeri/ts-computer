import { CodeGenerator } from "./generator";

describe("generator", () => {
  test("(A) instructions", () => {
    const gen = new CodeGenerator();

    const tests: [string, string][] = [
      ["10", "0000000000001010"],
      ["1000", "0000001111101000"],
      ["1024", "0000010000000000"],
      ["32768", "0000000000000000"],
      ["32769", "0000000000000001"],
    ];

    tests.forEach(([input, output]) =>
      expect(gen.generate_A_instruction({ symbol: input })).toEqual(output)
    );
  });

  test("(C) instructions comp", () => {
    const gen = new CodeGenerator();

    const tests: C_INSTRUCTION_TEST[] = [
      {
        comp: "0",
        output: "1110101010000000",
      },
      {
        comp: "1",
        output: "1110111111000000",
      },
      {
        comp: "-1",
        output: "1110111010000000",
      },
      {
        comp: "D",
        output: "1110001100000000",
      },
      {
        comp: "A",
        output: "1110110000000000",
      },
      {
        comp: "!D",
        output: "1110001101000000",
      },
      {
        comp: "!A",
        output: "1110110001000000",
      },
      {
        comp: "-D",
        output: "1110001111000000",
      },
      {
        comp: "-A",
        output: "1110110011000000",
      },
      {
        comp: "D+1",
        output: "1110011111000000",
      },
      {
        comp: "A+1",
        output: "1110110111000000",
      },
      {
        comp: "D-1",
        output: "1110001110000000",
      },
      {
        comp: "A-1",
        output: "1110110010000000",
      },
      {
        comp: "D+A",
        output: "1110000010000000",
      },
      {
        comp: "D-A",
        output: "1110010011000000",
      },
      {
        comp: "A-D",
        output: "1110000111000000",
      },
      {
        comp: "D&A",
        output: "1110000000000000",
      },
      {
        comp: "D|A",
        output: "1110010101000000",
      },
      {
        comp: "M",
        output: "1111110000000000",
      },
      {
        comp: "!M",
        output: "1111110001000000",
      },
      {
        comp: "-M",
        output: "1111110011000000",
      },
      {
        comp: "M+1",
        output: "1111110111000000",
      },
      {
        comp: "M-1",
        output: "1111110010000000",
      },
      {
        comp: "D+M",
        output: "1111000010000000",
      },
      {
        comp: "D-M",
        output: "1111010011000000",
      },
      {
        comp: "M-D",
        output: "1111000111000000",
      },
      {
        comp: "D&M",
        output: "1111000000000000",
      },
      {
        comp: "D|M",
        output: "1111010101000000",
      },
    ];

    tests.forEach(({ comp, output, dest, jump }) => {
      expect(gen.generate_C_instruction({ comp, dest, jump })).toEqual(output);
    });
  });

  test("(C) instructions dest", () => {
    const gen = new CodeGenerator();

    const tests: C_INSTRUCTION_TEST[] = [
      {
        comp: "0",
        output: "1110101010000000",
      },
      {
        comp: "0",
        dest: "M",
        output: "1110101010001000",
      },
      {
        comp: "0",
        dest: "D",
        output: "1110101010010000",
      },
      {
        comp: "0",
        dest: "MD",
        output: "1110101010011000",
      },
      {
        comp: "0",
        dest: "A",
        output: "1110101010100000",
      },
      {
        comp: "0",
        dest: "MA",
        output: "1110101010101000",
      },
      {
        comp: "0",
        dest: "DA",
        output: "1110101010110000",
      },
      {
        comp: "0",
        dest: "DMA",
        output: "1110101010111000",
      },
    ];

    tests.forEach(({ comp, output, dest, jump }) => {
      expect(gen.generate_C_instruction({ comp, dest, jump })).toEqual(output);
    });
  });

  test("(C) instructions jump", () => {
    const gen = new CodeGenerator();

    const tests: C_INSTRUCTION_TEST[] = [
      {
        comp: "0",
        output: "1110101010000000",
      },
      {
        comp: "0",
        jump: "JGT",
        output: "1110101010000001",
      },
      {
        comp: "0",
        jump: "JEQ",
        output: "1110101010000010",
      },
      {
        comp: "0",
        jump: "JGE",
        output: "1110101010000011",
      },
      {
        comp: "0",
        jump: "JLT",
        output: "1110101010000100",
      },
      {
        comp: "0",
        jump: "JNE",
        output: "1110101010000101",
      },
      {
        comp: "0",
        jump: "JLE",
        output: "1110101010000110",
      },
      {
        comp: "0",
        jump: "JMP",
        output: "1110101010000111",
      },
    ];

    tests.forEach(({ comp, output, dest, jump }) => {
      expect(gen.generate_C_instruction({ comp, dest, jump })).toEqual(output);
    });
  });
});

type C_INSTRUCTION_TEST = {
  dest?: string;
  jump?: string;
  comp: string;
  output: string;
};
