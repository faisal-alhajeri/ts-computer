import { MultiBitRegister } from "./bit";

describe("multibit register", () => {
  test("store multi bit values", () => {
    const register = new MultiBitRegister(4);

    expect(register.eval([[1, 0, 0, 1], 0, 0])).toEqual([[0, 0, 0, 0]]);
    expect(register.eval([[0, 1, 1, 0], 0, 1])).toEqual([[0, 0, 0, 0]]);
    expect(register.eval([[0, 1, 0, 1], 0, 0])).toEqual([[0, 0, 0, 0]]);
    expect(register.eval([[1, 1, 1, 0], 1, 1])).toEqual([[0, 0, 0, 0]]);
    expect(register.eval([[0, 0, 0, 1], 0, 0])).toEqual([[1, 1, 1, 0]]);
    expect(register.eval([[0, 0, 1, 1], 0, 1])).toEqual([[1, 1, 1, 0]]);
    expect(register.eval([[0, 1, 1, 1], 0, 0])).toEqual([[1, 1, 1, 0]]);
    expect(register.eval([[1, 0, 0, 1], 0, 1])).toEqual([[1, 1, 1, 0]]);
    expect(register.eval([[1, 1, 1, 1], 1, 0])).toEqual([[1, 1, 1, 0]]);
    expect(register.eval([[0, 0, 1, 0], 1, 1])).toEqual([[1, 1, 1, 1]]);
    expect(register.eval([[1, 1, 1, 1], 0, 0])).toEqual([[0, 0, 1, 0]]);
    expect(register.eval([[0, 0, 0, 1], 0, 1])).toEqual([[0, 0, 1, 0]]);
    expect(register.eval([[0, 1, 1, 0], 0, 0])).toEqual([[0, 0, 1, 0]]);
  });
});
