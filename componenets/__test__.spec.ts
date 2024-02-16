import { Bit, BitArray } from "../gate";
import { AdditionGate } from "./Addition";

describe("component gates", () => {
  test("addition gate", () => {
    const addGate = new AdditionGate(4);

    let operations: [BitArray, BitArray, BitArray, Bit][] = [
      [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], 0],
      [[0, 0, 0, 1], [0, 0, 0, 1], [0, 0, 1, 0], 0],
      [[1, 0, 1, 1], [0, 1, 1, 1], [0, 0, 1, 0], 1],
      [[0, 0, 1, 1], [0, 1, 1, 1], [1, 0, 1, 0], 0],
      [[0, 0, 1, 0], [1, 0, 0, 1], [1, 0, 1, 1], 0],
    ];

    for (const op of operations) {
      const [x, y, expectRes, expextOverF] = op;
      const [res, overF] = addGate.eval([x, y]);

      expect(res).toEqual(expectRes);
      expect(overF).toEqual(expextOverF);
    }
  });
});
