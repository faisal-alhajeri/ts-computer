import { HackMachine } from ".";
import { Bit, BitArray } from "../componenets/gate";

async function runBin({
  bin,
  machine,
  rounds,
  untilPC,
}: {
  bin: string[];
  machine: HackMachine;
  rounds?: number;
  untilPC?: number;
}) {
  const toRun = bin.map((b) => b.split("").map((s) => parseInt(s) as Bit));
  await machine.loadROM({ binary: toRun });
  if (untilPC !== undefined) {
  } else {
    for (const _ of new Array(rounds ?? bin.length)) {
      await machine.round();
    }
  }
}

describe("hack machine", () => {
  test("example 1: R2 = R0 + R1 + 17", async () => {
    const machine = new HackMachine();

    const bin = [
      "0000000000000000",
      "1111110000010000",
      "0000000000000001",
      "1111000010010000",
      "0000000000010001",
      "1110000010010000",
      "0000000000000010",
      "1110001100001000",
      "0000000000001000",
      "1110101010000111",
    ];

    let R2: BitArray;

    machine.reset();
    await machine.loadRAM({
      binary: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
      ],
    });
    await runBin({ bin, machine });
    R2 = machine.inspectRAM({ offset: 2 })[0];
    expect(R2).toEqual([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1]);

    machine.reset();
    await machine.loadRAM({
      binary: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
      ],
    });
    await runBin({ bin, machine });
    R2 = machine.inspectRAM({ offset: 2 })[0];
    expect(R2).toEqual([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0]);
  });

  test("example 2: R1 = 1+ 2+ ... + M(R0)", async () => {
    const machine = new HackMachine();

    const bin = [
      "0000000000010000",
      "1110101010001000",
      "0000000000010001",
      "1110101010001000",
      "0000000000000000",
      "1111110000010000",
      "0000000000010000",
      "1111000111010000",
      "0000000000010010",
      "1110001100000001",
      "0000000000010000",
      "1111110000010000",
      "0000000000010001",
      "1111000010001000",
      "0000000000010000",
      "1111110111001000",
      "0000000000000100",
      "1110101010000111",
      "0000000000010001",
      "1111110000010000",
      "0000000000000001",
      "1110001100001000",
      "0000000000010010",
      "1110101010000111",
    ];

    machine.reset();
    await machine.loadRAM({
      binary: [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0]],
    });
    await runBin({ bin, machine, rounds: 200 });
    let [R0, R1] = machine.inspectRAM({ offset: 0, length: 2 });
    console.log({ R0, R1 });

    expect(R1).toEqual([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0]);
  });

  test("example 2: for (i in R0 to R0 + R1) { RAM[i] = -1}  ", async () => {
    const machine = new HackMachine();

    const bin = [
      "0000000000010000",
      "1110101010001000",
      "0000000000010000",
      "1111110000010000",
      "0000000000000001",
      "1111000111010000",
      "0000000000010001",
      "1110001100000010",
      "0000000000010000",
      "1111110000010000",
      "0000000000000000",
      "1111000010100000",
      "1110111010001000",
      "0000000000010000",
      "1111110111001000",
      "0000000000000010",
      "1110101010000111",
      "0000000000010001",
      "1110101010000111",
    ];

    machine.reset();
    await machine.loadRAM({
      binary: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
      ],
    });
    await runBin({ bin, machine, rounds: 200 });
    let result = machine.inspectRAM({ offset: 9, length: 5 });

    expect(result).toEqual([
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ]);
  });
});
