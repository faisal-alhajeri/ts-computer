import { RAM } from ".";
import { Bit } from "../../gate";

describe("ram", () => {
  test("ram stores value", async () => {
    const ram = new RAM(4, 2);

    expect(await ram.eval([[1, 0, 0, 1], 1, [0, 1], 0])).toEqual([
      [0, 0, 0, 0],
    ]);
    expect(await ram.eval([[1, 0, 0, 1], 0, [0, 1], 1])).toEqual([
      [1, 0, 0, 1],
    ]);
    expect(await ram.eval([[0, 1, 1, 0], 0, [1, 0], 0])).toEqual([
      [0, 0, 0, 0],
    ]);
    expect(await ram.eval([[0, 1, 1, 0], 1, [1, 0], 1])).toEqual([
      [0, 0, 0, 0],
    ]);
    expect(await ram.eval([[0, 1, 1, 1], 0, [1, 0], 0])).toEqual([
      [0, 1, 1, 0],
    ]);
    expect(await ram.eval([[0, 1, 1, 1], 1, [1, 1], 1])).toEqual([
      [0, 0, 0, 0],
    ]);
    expect(await ram.eval([[0, 1, 0, 0], 0, [1, 1], 0])).toEqual([
      [0, 1, 1, 1],
    ]);

    //     const inputs: Bit[] = [
    //       1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1,
    //     ];
    //     const expextedOutputs: Bit[] = [0, ...inputs].slice(0, -1) as Bit[];
    //     const realOutputs: Bit[] = [];
    //     let clock: Bit = 0;
    //     for (const i of inputs) {
    //       realOutputs.push(dff.eval([i, clock])[0]);
    //       clock = ((clock + 1) % 2) as Bit;
    //     }

    //     expect(realOutputs).toEqual(expextedOutputs);
    //   });
  });
});
