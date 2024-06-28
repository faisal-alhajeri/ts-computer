import { MultiBitRegister } from "./bit";

describe("multibit register", () => {
  test("store multi bit values", async () => {
    const register = new MultiBitRegister(4);

    expect(await register.eval([[1, 0, 0, 1], 0, 0])).toEqual([[0, 0, 0, 0]]);
    expect(await register.eval([[0, 1, 1, 0], 0, 1])).toEqual([[0, 0, 0, 0]]);
    expect(await register.eval([[0, 1, 0, 1], 0, 0])).toEqual([[0, 0, 0, 0]]);
    expect(await register.eval([[1, 1, 1, 0], 1, 1])).toEqual([[0, 0, 0, 0]]);
    expect(await register.eval([[0, 0, 0, 1], 0, 0])).toEqual([[1, 1, 1, 0]]);
    expect(await register.eval([[0, 0, 1, 1], 0, 1])).toEqual([[1, 1, 1, 0]]);
    expect(await register.eval([[0, 1, 1, 1], 0, 0])).toEqual([[1, 1, 1, 0]]);
    expect(await register.eval([[1, 0, 0, 1], 0, 1])).toEqual([[1, 1, 1, 0]]);
    expect(await register.eval([[1, 1, 1, 1], 1, 0])).toEqual([[1, 1, 1, 0]]);
    expect(await register.eval([[0, 0, 1, 0], 1, 1])).toEqual([[1, 1, 1, 1]]);
    expect(await register.eval([[1, 1, 1, 1], 0, 0])).toEqual([[0, 0, 1, 0]]);
    expect(await register.eval([[0, 0, 0, 1], 0, 1])).toEqual([[0, 0, 1, 0]]);
    expect(await register.eval([[0, 1, 1, 0], 0, 0])).toEqual([[0, 0, 1, 0]]);
  });
  test("store multi bit values SYNC", async () => {
    const register = new MultiBitRegister(4);

    expect(register.evalSync([[1, 0, 0, 1], 0, 0])).toEqual([[0, 0, 0, 0]]);
    expect(register.evalSync([[0, 1, 1, 0], 0, 1])).toEqual([[0, 0, 0, 0]]);
    expect(register.evalSync([[0, 1, 0, 1], 0, 0])).toEqual([[0, 0, 0, 0]]);
    expect(register.evalSync([[1, 1, 1, 0], 1, 1])).toEqual([[0, 0, 0, 0]]);
    expect(register.evalSync([[0, 0, 0, 1], 0, 0])).toEqual([[1, 1, 1, 0]]);
    expect(register.evalSync([[0, 0, 1, 1], 0, 1])).toEqual([[1, 1, 1, 0]]);
    expect(register.evalSync([[0, 1, 1, 1], 0, 0])).toEqual([[1, 1, 1, 0]]);
    expect(register.evalSync([[1, 0, 0, 1], 0, 1])).toEqual([[1, 1, 1, 0]]);
    expect(register.evalSync([[1, 1, 1, 1], 1, 0])).toEqual([[1, 1, 1, 0]]);
    expect(register.evalSync([[0, 0, 1, 0], 1, 1])).toEqual([[1, 1, 1, 1]]);
    expect(register.evalSync([[1, 1, 1, 1], 0, 0])).toEqual([[0, 0, 1, 0]]);
    expect(register.evalSync([[0, 0, 0, 1], 0, 1])).toEqual([[0, 0, 1, 0]]);
    expect(register.evalSync([[0, 1, 1, 0], 0, 0])).toEqual([[0, 0, 1, 0]]);
  });
});
