import { RAM } from ".";
import { Bit } from "../../gate";

describe("ram", () => {
  test("ram stores value", async () => {
    const ram = new RAM(4, 2);

    expect(await ram.eval([[1, 0, 0, 1], 1, [0, 1], 0])).toEqual([
      [1, 0, 0, 1],
    ]);
    expect(await ram.eval([[1, 0, 0, 1], 0, [0, 1], 1])).toEqual([
      [1, 0, 0, 1],
    ]);
    expect(await ram.eval([[0, 1, 1, 0], 0, [1, 0], 0])).toEqual([
      [0, 0, 0, 0],
    ]);
    expect(await ram.eval([[0, 1, 1, 0], 1, [1, 0], 1])).toEqual([
      [0, 1, 1, 0],
    ]);
    expect(await ram.eval([[0, 1, 1, 1], 0, [1, 0], 0])).toEqual([
      [0, 1, 1, 0],
    ]);
    expect(await ram.eval([[0, 1, 1, 1], 1, [1, 1], 1])).toEqual([
      [0, 1, 1, 1],
    ]);
    expect(await ram.eval([[0, 1, 0, 0], 0, [1, 1], 0])).toEqual([
      [0, 1, 1, 1],
    ]);
  });

  test("ram stores value SYNC", async () => {
    const ram = new RAM(4, 2);

    expect(ram.evalSync([[1, 0, 0, 1], 1, [0, 1], 0])).toEqual([[1, 0, 0, 1]]);
    expect(ram.evalSync([[1, 0, 0, 1], 0, [0, 1], 1])).toEqual([[1, 0, 0, 1]]);
    expect(ram.evalSync([[0, 1, 1, 0], 0, [1, 0], 0])).toEqual([[0, 0, 0, 0]]);
    expect(ram.evalSync([[0, 1, 1, 0], 1, [1, 0], 1])).toEqual([[0, 1, 1, 0]]);
    expect(ram.evalSync([[0, 1, 1, 1], 0, [1, 0], 0])).toEqual([[0, 1, 1, 0]]);
    expect(ram.evalSync([[0, 1, 1, 1], 1, [1, 1], 1])).toEqual([[0, 1, 1, 1]]);
    expect(ram.evalSync([[0, 1, 0, 0], 0, [1, 1], 0])).toEqual([[0, 1, 1, 1]]);
  });
});
