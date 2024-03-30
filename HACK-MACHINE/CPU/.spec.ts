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
  private static clock: Bit = 0;
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

    this.clock = (this.clock ^ 1) as Bit;

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
  test("(c) operations jumps", async () => {});
});
