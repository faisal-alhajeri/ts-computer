import { DFF } from ".";
import { Bit } from "../../gate";

describe("dff", () => {
  test("dff saves vales and export it in next eval", async () => {
    const dff = new DFF();
    const inputs: Bit[] = [
      1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1,
    ];
    const expextedOutputs: Bit[] = [0, ...inputs].slice(0, -1) as Bit[];
    const realOutputs: Bit[] = [];
    let clock: Bit = 0;
    for (const i of inputs) {
      realOutputs.push(await dff.eval([i, clock]).then(([bit]) => bit));
      clock = ((clock + 1) % 2) as Bit;
    }

    expect(realOutputs).toEqual(expextedOutputs);
  });

  test("giving same clock doesnt change the internal dff value", async () => {
    const dff = new DFF();
    expect(await dff.eval([1, 0])).toEqual([0]);
    expect(await dff.eval([0, 1])).toEqual([1]);
    expect(await dff.eval([1, 1])).toEqual([1]);
    expect(await dff.eval([1, 1])).toEqual([1]);
    expect(await dff.eval([1, 0])).toEqual([0]);
    expect(await dff.eval([0, 0])).toEqual([0]);
    expect(await dff.eval([1, 0])).toEqual([0]);
    expect(await dff.eval([0, 0])).toEqual([0]);
    expect(await dff.eval([0, 1])).toEqual([1]);
    expect(await dff.eval([0, 0])).toEqual([0]);
  });

  test("dff saves vales and export it in next eval SYNC", async () => {
    const dff = new DFF();
    const inputs: Bit[] = [
      1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1,
    ];
    const expextedOutputs: Bit[] = [0, ...inputs].slice(0, -1) as Bit[];
    const realOutputs: Bit[] = [];
    let clock: Bit = 0;
    for (const i of inputs) {
      realOutputs.push(dff.evalSync([i, clock])[0]);
      clock = ((clock + 1) % 2) as Bit;
    }

    expect(realOutputs).toEqual(expextedOutputs);
  });

  test("giving same clock doesnt change the internal dff value SYNC", async () => {
    const dff = new DFF();
    expect(dff.evalSync([1, 0])).toEqual([0]);
    expect(dff.evalSync([0, 1])).toEqual([1]);
    expect(dff.evalSync([1, 1])).toEqual([1]);
    expect(dff.evalSync([1, 1])).toEqual([1]);
    expect(dff.evalSync([1, 0])).toEqual([0]);
    expect(dff.evalSync([0, 0])).toEqual([0]);
    expect(dff.evalSync([1, 0])).toEqual([0]);
    expect(dff.evalSync([0, 0])).toEqual([0]);
    expect(dff.evalSync([0, 1])).toEqual([1]);
    expect(dff.evalSync([0, 0])).toEqual([0]);
  });
});
