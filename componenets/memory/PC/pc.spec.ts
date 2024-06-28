import { PC } from ".";

describe("pc", () => {
  test("pc do functionallity well", async () => {
    const pc = new PC(4);

    expect(await pc.eval([[1, 0, 0, 1], [0, 0, 0], 0])).toEqual([[0, 0, 0, 0]]);
    expect(await pc.eval([[1, 0, 0, 1], [0, 1, 0], 1])).toEqual([[0, 0, 0, 0]]);
    expect(await pc.eval([[1, 0, 0, 1], [0, 0, 0], 0])).toEqual([[0, 0, 0, 1]]);
    expect(await pc.eval([[1, 0, 0, 1], [0, 1, 0], 1])).toEqual([[0, 0, 0, 1]]);
    expect(await pc.eval([[1, 0, 0, 1], [0, 1, 0], 0])).toEqual([[0, 0, 1, 0]]);
    expect(await pc.eval([[1, 0, 0, 1], [0, 0, 1], 1])).toEqual([[0, 0, 1, 1]]);
    expect(await pc.eval([[1, 0, 0, 1], [0, 0, 0], 0])).toEqual([[0, 0, 0, 0]]);
    expect(await pc.eval([[1, 0, 0, 1], [1, 0, 0], 1])).toEqual([[0, 0, 0, 0]]);
    expect(await pc.eval([[1, 0, 0, 1], [0, 1, 0], 0])).toEqual([[1, 0, 0, 1]]);
    expect(await pc.eval([[1, 0, 0, 1], [1, 1, 0], 1])).toEqual([[1, 0, 1, 0]]);
    expect(await pc.eval([[1, 0, 0, 1], [0, 0, 0], 0])).toEqual([[1, 0, 0, 1]]);
  });

  test("pc do functionallity well", async () => {
    const pc = new PC(4);

    expect(pc.evalSync([[1, 0, 0, 1], [0, 0, 0], 0])).toEqual([[0, 0, 0, 0]]);
    expect(pc.evalSync([[1, 0, 0, 1], [0, 1, 0], 1])).toEqual([[0, 0, 0, 0]]);
    expect(pc.evalSync([[1, 0, 0, 1], [0, 0, 0], 0])).toEqual([[0, 0, 0, 1]]);
    expect(pc.evalSync([[1, 0, 0, 1], [0, 1, 0], 1])).toEqual([[0, 0, 0, 1]]);
    expect(pc.evalSync([[1, 0, 0, 1], [0, 1, 0], 0])).toEqual([[0, 0, 1, 0]]);
    expect(pc.evalSync([[1, 0, 0, 1], [0, 0, 1], 1])).toEqual([[0, 0, 1, 1]]);
    expect(pc.evalSync([[1, 0, 0, 1], [0, 0, 0], 0])).toEqual([[0, 0, 0, 0]]);
    expect(pc.evalSync([[1, 0, 0, 1], [1, 0, 0], 1])).toEqual([[0, 0, 0, 0]]);
    expect(pc.evalSync([[1, 0, 0, 1], [0, 1, 0], 0])).toEqual([[1, 0, 0, 1]]);
    expect(pc.evalSync([[1, 0, 0, 1], [1, 1, 0], 1])).toEqual([[1, 0, 1, 0]]);
    expect(pc.evalSync([[1, 0, 0, 1], [0, 0, 0], 0])).toEqual([[1, 0, 0, 1]]);
  });
});
