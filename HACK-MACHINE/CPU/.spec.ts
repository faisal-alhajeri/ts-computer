import { Bit, BitArray } from "../../componenets/gate";
import { CPU, CPUInputs, CPUOutputs } from "./index";

type CPUTest = {
  inputs: CPUPartialInputs;
  expected: CPUPartialResult;
};

type CPUPartialInputs = {
  inM?: BitArray;
  instruction: BitArray;
  reset?: Bit;
};

type CPUPartialResult = Partial<{
  outM: BitArray;
  writeM: Bit;
  addresM: BitArray;
  pc: BitArray;
}>;

class Util {
  private static _clock: Bit = 0;

  static get clock() {
    const res = this._clock;
    this._clock = (this._clock ^ 1) as Bit;

    return res;
  }

  static randomBit(): Bit {
    return Math.random() > 0.5 ? 1 : 0;
  }

  static random16Bits(): BitArray {
    return new Array(16).fill(0).map(Util.randomBit);
  }

  static formStrToBitArray(str: string): BitArray {
    const res = str.split("").map((bit) => (bit === "0" ? 0 : 1)) as BitArray;
    return res;
  }

  static async test({
    cpu,
    experement: {
      expected,
      inputs: { instruction, inM = Util.random16Bits(), reset = 0 },
    },
  }: {
    cpu: CPU;
    experement: CPUTest;
  }) {
    const [outM, writeM, addresM, pc] = await cpu.eval([
      inM,
      instruction,
      reset,
      this.clock,
    ]);

    if (expected.outM !== undefined) expect(outM).toEqual(expected.outM);

    if (expected.writeM !== undefined) expect(writeM).toEqual(expected.writeM);

    if (expected.addresM !== undefined)
      expect(addresM).toEqual(expected.addresM);

    if (expected.pc !== undefined) expect(pc).toEqual(expected.pc);
  }
}

describe("CPU", () => {
  test("(a) operations", async () => {
    const cpu = new CPU();

    const experements: CPUTest[] = [
      {
        inputs: { instruction: Util.formStrToBitArray("0000000000000011") },
        expected: {
          writeM: 0,
          addresM: Util.formStrToBitArray("0000000000000011"),
          pc: Util.formStrToBitArray("0000000000000001"),
        },
      },
      {
        inputs: { instruction: Util.formStrToBitArray("0000000100000001") },

        expected: {
          writeM: 0,
          addresM: Util.formStrToBitArray("0000000100000001"),
          pc: Util.formStrToBitArray("0000000000000010"),
        },
      },
      {
        inputs: { instruction: Util.formStrToBitArray("0000000100010001") },

        expected: {
          writeM: 0,
          addresM: Util.formStrToBitArray("0000000100010001"),
          pc: Util.formStrToBitArray("0000000000000011"),
        },
      },
    ];

    for (const experement of experements) {
      await Util.test({ cpu, experement });
    }
  });

  test("(c) operations with results", async () => {
    const cpu = new CPU();

    const experements: CPUTest[] = [
      // (a) instruction
      {
        inputs: { instruction: Util.formStrToBitArray("0000000000001000") },
        expected: {
          writeM: 0,
          addresM: Util.formStrToBitArray("0000000000001000"),
          pc: Util.formStrToBitArray("0000000000000001"),
        },
      },
      // DM = A
      {
        inputs: { instruction: Util.formStrToBitArray("1110110000011000") },

        expected: {
          writeM: 1,
          outM: Util.formStrToBitArray("0000000000001000"),
          addresM: Util.formStrToBitArray("0000000000001000"),
          pc: Util.formStrToBitArray("0000000000000010"),
        },
      },
      // D = D + 1
      {
        inputs: { instruction: Util.formStrToBitArray("1110011111010000") },

        expected: {
          writeM: 0,
          addresM: Util.formStrToBitArray("0000000000001000"),
          pc: Util.formStrToBitArray("0000000000000011"),
        },
      },
      // A = D + 1
      {
        inputs: { instruction: Util.formStrToBitArray("1110011111100000") },

        expected: {
          writeM: 0,
          addresM: Util.formStrToBitArray("0000000000001010"),
          pc: Util.formStrToBitArray("0000000000000100"),
        },
      },

      // ADM = D|A
      // D here is 0000000000001001
      {
        inputs: {
          instruction: Util.formStrToBitArray("1110010101111000"),
        },
        expected: {
          writeM: 1,
          outM: Util.formStrToBitArray("0000000000001011"),
          addresM: Util.formStrToBitArray("0000000000001011"),
          pc: Util.formStrToBitArray("0000000000000101"),
        },
      },
      // M = D
      // D here is 0000000000001011
      {
        inputs: {
          instruction: Util.formStrToBitArray("1110001100001000"),
          inM: Util.random16Bits(), // just to make sure that it has no effect
        },
        expected: {
          writeM: 1,
          outM: Util.formStrToBitArray("0000000000001011"),
          addresM: Util.formStrToBitArray("0000000000001011"),
          pc: Util.formStrToBitArray("0000000000000110"),
        },
      },
      // A = M
      {
        inputs: {
          instruction: Util.formStrToBitArray("1111110000100000"),
          inM: Util.formStrToBitArray("1010101010101010"),
        },
        expected: {
          writeM: 0,
          addresM: Util.formStrToBitArray("1010101010101010"),
          pc: Util.formStrToBitArray("0000000000000111"),
        },
      },
    ];

    for (const experement of experements) {
      await Util.test({ cpu, experement });
    }
  });

  // TODO: complete this test
  test("(c) operations jumps", async () => {
    // we will change address to 0 every time then do a test
    const cpu = new CPU();
    const JUMP_PC = Util.formStrToBitArray("0000000000001000");
    const NO_JUMP_PC = Util.formStrToBitArray("0000000000000010");
    const RESET_PC = Util.formStrToBitArray("0000000000000000");
    const M = Util.formStrToBitArray("1010000000000000");
    const D = Util.formStrToBitArray("0000000000001010");

    const D_INSTRUCTION_PRFIX = "1110001100000";
    const M_INSTRUCTION_PRFIX = "1111110000000";
    const D_AND_M_INSTRUCTION_PRFIX = "1111000000000";

    // D = M (and reset PC)
    await cpu.eval([
      D,
      Util.formStrToBitArray("1111110000010000"),
      1,
      Util.clock,
    ]);

    const experements: CPUTest[] = [
      // -=-=-=-=-=-=-=-=-=- null -=-=-=-=-=-=-=-=-=-=
      // D; null -> no jump
      {
        inputs: {
          inM: M,
          instruction: Util.formStrToBitArray(`${D_INSTRUCTION_PRFIX}000`),
        },
        expected: {
          pc: NO_JUMP_PC,
        },
      },
      // M; null -> no jump
      {
        inputs: {
          inM: M,
          instruction: Util.formStrToBitArray(`${M_INSTRUCTION_PRFIX}000`),
        },
        expected: {
          pc: NO_JUMP_PC,
        },
      },
      // D&M; null -> no jump
      {
        inputs: {
          inM: M,
          instruction: Util.formStrToBitArray(
            `${D_AND_M_INSTRUCTION_PRFIX}000`
          ),
        },
        expected: {
          pc: NO_JUMP_PC,
        },
      },
      // -=-=-=-=-=-=-=-=-=- JGT -=-=-=-=-=-=-=-=-=-=
      // D; JGT -> jump
      {
        inputs: {
          inM: M,
          instruction: Util.formStrToBitArray(`${D_INSTRUCTION_PRFIX}001`),
        },
        expected: {
          pc: JUMP_PC,
        },
      },
      // M; JGT -> no jump
      {
        inputs: {
          inM: M,
          instruction: Util.formStrToBitArray(`${M_INSTRUCTION_PRFIX}001`),
        },
        expected: {
          pc: NO_JUMP_PC,
        },
      },
      // D&M; JGT -> no jump
      {
        inputs: {
          inM: M,
          instruction: Util.formStrToBitArray(
            `${D_AND_M_INSTRUCTION_PRFIX}001`
          ),
        },
        expected: {
          pc: NO_JUMP_PC,
        },
      },
      // -=-=-=-=-=-=-=-=-=- JEQ -=-=-=-=-=-=-=-=-=-=
      // D; JEQ -> no jump
      {
        inputs: {
          inM: M,
          instruction: Util.formStrToBitArray(`${D_INSTRUCTION_PRFIX}010`),
        },
        expected: {
          pc: NO_JUMP_PC,
        },
      },
      // M; JEQ -> no jump
      {
        inputs: {
          inM: M,
          instruction: Util.formStrToBitArray(`${M_INSTRUCTION_PRFIX}010`),
        },
        expected: {
          pc: NO_JUMP_PC,
        },
      },
      // D&M; JEQ ->  jump
      {
        inputs: {
          inM: M,
          instruction: Util.formStrToBitArray(
            `${D_AND_M_INSTRUCTION_PRFIX}010`
          ),
        },
        expected: {
          pc: JUMP_PC,
        },
      },
      // -=-=-=-=-=-=-=-=-=- JGE -=-=-=-=-=-=-=-=-=-=
      // D; JGE ->  jump
      {
        inputs: {
          inM: M,
          instruction: Util.formStrToBitArray(`${D_INSTRUCTION_PRFIX}011`),
        },
        expected: {
          pc: JUMP_PC,
        },
      },
      // M; JGE -> no jump
      {
        inputs: {
          inM: M,
          instruction: Util.formStrToBitArray(`${M_INSTRUCTION_PRFIX}011`),
        },
        expected: {
          pc: NO_JUMP_PC,
        },
      },
      // D&M; JGE ->  jump
      {
        inputs: {
          inM: M,
          instruction: Util.formStrToBitArray(
            `${D_AND_M_INSTRUCTION_PRFIX}011`
          ),
        },
        expected: {
          pc: JUMP_PC,
        },
      },
      // -=-=-=-=-=-=-=-=-=- JLT -=-=-=-=-=-=-=-=-=-=
      // D; JLT -> no jump
      {
        inputs: {
          inM: M,
          instruction: Util.formStrToBitArray(`${D_INSTRUCTION_PRFIX}100`),
        },
        expected: {
          pc: NO_JUMP_PC,
        },
      },
      // M; JLT ->  jump
      {
        inputs: {
          inM: M,
          instruction: Util.formStrToBitArray(`${M_INSTRUCTION_PRFIX}100`),
        },
        expected: {
          pc: JUMP_PC,
        },
      },
      // D&M; JLT -> no jump
      {
        inputs: {
          inM: M,
          instruction: Util.formStrToBitArray(
            `${D_AND_M_INSTRUCTION_PRFIX}100`
          ),
        },
        expected: {
          pc: NO_JUMP_PC,
        },
      },
      // -=-=-=-=-=-=-=-=-=- JNE -=-=-=-=-=-=-=-=-=-=
      // D; JNE ->  jump
      {
        inputs: {
          inM: M,
          instruction: Util.formStrToBitArray(`${D_INSTRUCTION_PRFIX}101`),
        },
        expected: {
          pc: JUMP_PC,
        },
      },
      // M; JNE ->  jump
      {
        inputs: {
          inM: M,
          instruction: Util.formStrToBitArray(`${M_INSTRUCTION_PRFIX}101`),
        },
        expected: {
          pc: JUMP_PC,
        },
      },
      // D&M; JNE -> no jump
      {
        inputs: {
          inM: M,
          instruction: Util.formStrToBitArray(
            `${D_AND_M_INSTRUCTION_PRFIX}101`
          ),
        },
        expected: {
          pc: NO_JUMP_PC,
        },
      },
      // -=-=-=-=-=-=-=-=-=- JLE -=-=-=-=-=-=-=-=-=-=
      // D; JLE -> no jump
      {
        inputs: {
          inM: M,
          instruction: Util.formStrToBitArray(`${D_INSTRUCTION_PRFIX}110`),
        },
        expected: {
          pc: NO_JUMP_PC,
        },
      },
      // M; JLE -> jump
      {
        inputs: {
          inM: M,
          instruction: Util.formStrToBitArray(`${M_INSTRUCTION_PRFIX}110`),
        },
        expected: {
          pc: JUMP_PC,
        },
      },
      // D&M; JLE -> jump
      {
        inputs: {
          inM: M,
          instruction: Util.formStrToBitArray(
            `${D_AND_M_INSTRUCTION_PRFIX}110`
          ),
        },
        expected: {
          pc: JUMP_PC,
        },
      },
      // -=-=-=-=-=-=-=-=-=- JMP -=-=-=-=-=-=-=-=-=-=
      // D; JMP ->  jump
      {
        inputs: {
          inM: M,
          instruction: Util.formStrToBitArray(`${D_INSTRUCTION_PRFIX}111`),
        },
        expected: {
          pc: JUMP_PC,
        },
      },
      // M; JMP -> jump
      {
        inputs: {
          inM: M,
          instruction: Util.formStrToBitArray(`${M_INSTRUCTION_PRFIX}111`),
        },
        expected: {
          pc: JUMP_PC,
        },
      },
      // D&M; JMP -> jump
      {
        inputs: {
          inM: M,
          instruction: Util.formStrToBitArray(
            `${D_AND_M_INSTRUCTION_PRFIX}111`
          ),
        },
        expected: {
          pc: JUMP_PC,
        },
      },
    ];

    for (const experement of experements) {
      await cpu.eval([Util.random16Bits(), RESET_PC, 1, Util.clock]);
      await cpu.eval([Util.random16Bits(), JUMP_PC, 0, Util.clock]);
      await Util.test({ cpu, experement });
    }
  });
});
