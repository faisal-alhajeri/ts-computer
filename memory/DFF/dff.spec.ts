import { DFF } from ".";
import { Bit } from "../../gate";

describe("dff", () => {
  test("dff saves vales and export it in next eval", () => {
    const dff = new DFF();
    const inputs: Bit[] = [
      1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1,
    ];
    const expextedOutputs: Bit[] = [0, ...inputs].slice(0, -1) as Bit[];
    const realOutputs: Bit[] = [];
    let clock: Bit = 0;
    for (const i of inputs) {
      realOutputs.push(dff.eval([i, clock])[0]);
      clock = ((clock + 1) % 2) as Bit;
    }

    expect(realOutputs).toEqual(expextedOutputs);
  });

  test("giving same clock doesnt change the internal dff value", () => {
    const dff = new DFF();
    expect(dff.eval([1, 0])).toEqual([0]);
    expect(dff.eval([0, 1])).toEqual([1]);
    expect(dff.eval([1, 1])).toEqual([1]);
    expect(dff.eval([1, 1])).toEqual([1]);
    expect(dff.eval([1, 0])).toEqual([0]);
    expect(dff.eval([0, 0])).toEqual([0]);
    expect(dff.eval([1, 0])).toEqual([0]);
    expect(dff.eval([0, 0])).toEqual([0]);
    expect(dff.eval([0, 1])).toEqual([1]);
    expect(dff.eval([0, 0])).toEqual([0]);
  });
});
