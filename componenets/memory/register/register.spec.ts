import { Register } from ".";
import { Bit } from "../../gate";

describe("Register", () => {
  test("stores values", async () => {
    const register = new Register();

    expect(await register.eval([1, 0, 0])).toEqual([0]);
    expect(await register.eval([1, 0, 1])).toEqual([0]);
    expect(await register.eval([0, 0, 0])).toEqual([0]);
    expect(await register.eval([1, 1, 1])).toEqual([0]);
    expect(await register.eval([0, 0, 0])).toEqual([1]);
    expect(await register.eval([0, 0, 1])).toEqual([1]);
    expect(await register.eval([1, 0, 0])).toEqual([1]);
    expect(await register.eval([1, 0, 1])).toEqual([1]);
    expect(await register.eval([0, 1, 0])).toEqual([1]);
    expect(await register.eval([1, 1, 1])).toEqual([0]);
    expect(await register.eval([0, 0, 0])).toEqual([1]);
    expect(await register.eval([1, 0, 1])).toEqual([1]);
    expect(await register.eval([0, 0, 0])).toEqual([1]);
  });

  test("stores values SYNC", async () => {
    const register = new Register();

    expect(register.evalSync([1, 0, 0])).toEqual([0]);
    expect(register.evalSync([1, 0, 1])).toEqual([0]);
    expect(register.evalSync([0, 0, 0])).toEqual([0]);
    expect(register.evalSync([1, 1, 1])).toEqual([0]);
    expect(register.evalSync([0, 0, 0])).toEqual([1]);
    expect(register.evalSync([0, 0, 1])).toEqual([1]);
    expect(register.evalSync([1, 0, 0])).toEqual([1]);
    expect(register.evalSync([1, 0, 1])).toEqual([1]);
    expect(register.evalSync([0, 1, 0])).toEqual([1]);
    expect(register.evalSync([1, 1, 1])).toEqual([0]);
    expect(register.evalSync([0, 0, 0])).toEqual([1]);
    expect(register.evalSync([1, 0, 1])).toEqual([1]);
    expect(register.evalSync([0, 0, 0])).toEqual([1]);
  });
});
