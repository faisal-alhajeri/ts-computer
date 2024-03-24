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
    console.log({ inputs: { instruction, inM, reset } });

    const [outM, writeM, addresM, pc] = await cpu.eval([
      inM,
      instruction,
      reset,
      this.clock,
    ]);

    this.clock = (this.clock ^ 1) as Bit;

    if (expected.outM) expect(outM).toEqual(expected.outM);

    if (expected.writeM) expect(writeM).toEqual(expected.writeM);

    if (expected.addresM) expect(addresM).toEqual(expected.addresM);

    if (expected.pc) expect(pc).toEqual(expected.pc);
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
});
