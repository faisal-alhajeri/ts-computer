import { HackMachine } from ".";
import { BitArray } from "../componenets/gate";

describe("hack machine", () => {
  test("m", async () => {
    const machine = new HackMachine();

    await machine.loadRAM({
      binary: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
      ],
    });
    const bin: any = [
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
    ].map((b) => b.split("").map((s) => parseInt(s)));

    await machine.loadROM({ binary: bin });
    for (const _ of new Array(10)) {
      await machine.round();
    }

    console.log({
      0: machine.inspectRAM({ offset: 0 }),
      1: machine.inspectRAM({ offset: 1 }),
      2: machine.inspectRAM({ offset: 2 }),
    });
  });
});
