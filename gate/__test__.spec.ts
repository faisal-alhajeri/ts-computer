import { Bit, BitArray } from ".";
import { AndGate } from "./derived/and";
import { MultiBitAndGate as MultiBitAndGate } from "./derived/and/multi/bit";
import { DeMultiplexerGate } from "./derived/demultiplexer";
import { MultiBitDeMultiplexerGate } from "./derived/demultiplexer/multi/bit";
import { MultiWayDeMultiplexerGate } from "./derived/demultiplexer/multi/ways";
import { MultiplexerGate } from "./derived/multiplexer";
import { MultiBitMultiplexerGate } from "./derived/multiplexer/multi/bit";
import { MultiWayMultiplexerGate } from "./derived/multiplexer/multi/ways";
import { NotGate } from "./derived/not";
import { MultiBitNotGate } from "./derived/not/multi/bit";
import { OrGate } from "./derived/or";
import { MultiBitOrGate as MultiBitOrGate } from "./derived/or/multi/bit";
import { MultiWayOrGate } from "./derived/or/multi/ways";

describe("simple gates", () => {
  test("reverse not gate", async () => {
    const notGate = new NotGate();
    expect(await notGate.eval([1])).toEqual([0]);
    expect(await notGate.eval([0])).toEqual([1]);
  });

  test("or gate", async () => {
    const orGate = new OrGate();
    expect(await orGate.eval([0, 0])).toEqual([0]);
    expect(await orGate.eval([0, 1])).toEqual([1]);
    expect(await orGate.eval([1, 0])).toEqual([1]);
    expect(await orGate.eval([1, 1])).toEqual([1]);
  });

  test("and gate", async () => {
    const andGate = new AndGate();
    expect(await andGate.eval([0, 0])).toEqual([0]);
    expect(await andGate.eval([0, 1])).toEqual([0]);
    expect(await andGate.eval([1, 0])).toEqual([0]);
    expect(await andGate.eval([1, 1])).toEqual([1]);
  });

  test("multiplexer gate", async () => {
    const multiplexerGate = new MultiplexerGate();
    expect(await multiplexerGate.eval([[0, 0], 0])).toEqual([0]);
    expect(await multiplexerGate.eval([[0, 1], 0])).toEqual([0]);
    expect(await multiplexerGate.eval([[1, 0], 0])).toEqual([1]);
    expect(await multiplexerGate.eval([[1, 1], 0])).toEqual([1]);
    expect(await multiplexerGate.eval([[0, 0], 1])).toEqual([0]);
    expect(await multiplexerGate.eval([[0, 1], 1])).toEqual([1]);
    expect(await multiplexerGate.eval([[1, 0], 1])).toEqual([0]);
    expect(await multiplexerGate.eval([[1, 1], 1])).toEqual([1]);
  });

  test("demultiplexer gate", async () => {
    const demultiplexerGate = new DeMultiplexerGate();
    expect(await demultiplexerGate.eval([[0], 0])).toEqual([0, 0]);
    expect(await demultiplexerGate.eval([[1], 0])).toEqual([1, 0]);
    expect(await demultiplexerGate.eval([[0], 1])).toEqual([0, 0]);
    expect(await demultiplexerGate.eval([[1], 1])).toEqual([0, 1]);
  });
});

describe("multibit gates", () => {
  test("multi bit not", async () => {
    const multiNot = new MultiBitNotGate(4);
    const [res] = await multiNot.eval([[1, 0, 0, 1]]);
    expect(res).toEqual([0, 1, 1, 0]);
  });

  test("multi bit or", async () => {
    const multiOr = new MultiBitOrGate(4);
    const [res] = await multiOr.eval([
      [1, 1, 0, 0],
      [1, 0, 1, 0],
    ]);

    expect(res).toEqual([1, 1, 1, 0]);
  });

  test("multi bit And", async () => {
    const multiAnd = new MultiBitAndGate(4);
    const [res] = await multiAnd.eval([
      [1, 1, 0, 0],
      [1, 0, 1, 0],
    ]);

    expect(res).toEqual([1, 0, 0, 0]);
  });

  test("multi bit Multplexer", async () => {
    const multiBitMultiplexerGate = new MultiBitMultiplexerGate(4);
    expect(
      await multiBitMultiplexerGate.eval([
        [
          [1, 1, 0, 0],
          [0, 1, 1, 0],
        ],
        0,
      ])
    ).toEqual([[1, 1, 0, 0]]);

    expect(
      await multiBitMultiplexerGate.eval([
        [
          [1, 1, 0, 0],
          [0, 1, 1, 0],
        ],
        1,
      ])
    ).toEqual([[0, 1, 1, 0]]);
  });

  test("multi bit DeMultplexer", async () => {
    const multiBitDeMultiplexerGate = new MultiBitDeMultiplexerGate();
    expect(await multiBitDeMultiplexerGate.eval([[1, 1, 0, 0], 0])).toEqual([
      [1, 1, 0, 0],
      [0, 0, 0, 0],
    ]);
    expect(await multiBitDeMultiplexerGate.eval([[1, 1, 0, 0], 1])).toEqual([
      [0, 0, 0, 0],
      [1, 1, 0, 0],
    ]);
  });
});

describe("multi way", () => {
  test("multi way or", async () => {
    expect.assertions(4);
    const gate = new MultiWayOrGate(1, 5);
    expect(await gate.eval([[1], [0], [0], [1], [0]])).toEqual([[1]]);
    expect(await gate.eval([[0], [0], [0], [1], [0]])).toEqual([[1]]);
    expect(await gate.eval([[0], [0], [0], [0], [0]])).toEqual([[0]]);
    try {
      await gate.eval([[0, 0, 0, 0]]);
    } catch (e) {
      expect(e).toBeDefined();
    }
  });

  test("multi way demultiplexer", async () => {
    // 2 select
    let gate = new MultiWayDeMultiplexerGate(5, 2);
    for (let i = 0; i < 4; i++) {
      const selectAsBits: BitArray = i
        .toString(2)
        .padStart(2, "0")
        .split("")
        .map((n) => parseInt(n) as Bit);

      const res = await gate.eval([[1, 1, 0, 1, 0], selectAsBits]);
      expect(res[i]).toEqual([1, 1, 0, 1, 0]);
      for (const arr of res.filter((_, idx) => idx !== i))
        expect(arr).toEqual([0, 0, 0, 0, 0]);
    }

    // 3 select
    gate = new MultiWayDeMultiplexerGate(2, 3);
    for (let i = 0; i < 8; i++) {
      const selectAsBits: BitArray = i
        .toString(2)
        .padStart(3, "0")
        .split("")
        .map((n) => parseInt(n) as Bit);
      const res = await gate.eval([[1, 0], selectAsBits]);
      expect(res[i]).toEqual([1, 0]);
      for (const arr of res.filter((_, idx) => idx !== i))
        expect(arr).toEqual([0, 0]);
    }

    // 4 select
    gate = new MultiWayDeMultiplexerGate(2, 4);
    for (let i = 0; i < 16; i++) {
      const selectAsBits: BitArray = i
        .toString(2)
        .padStart(3, "0")
        .split("")
        .map((n) => parseInt(n) as Bit);
      const res = await gate.eval([[1, 0], selectAsBits]);
      expect(res[i]).toEqual([1, 0]);
      for (const arr of res.filter((_, idx) => idx !== i))
        expect(arr).toEqual([0, 0]);
    }
  });

  test("multi way multiplexer", async () => {
    function generatePair(lenght: number, times: number): BitArray[] {
      let res: BitArray[] = [];

      for (let i = 0; i < times; i++) {
        res.push(
          new Array(lenght).fill(0).map(() => (Math.random() > 0.5 ? 1 : 0))
        );
      }

      return res;
    }

    // 4 select
    let gate = new MultiWayMultiplexerGate(2, 2);
    for (let i = 0; i < 4; i++) {
      const selectAsBits: BitArray = i
        .toString(2)
        .padStart(2, "0")
        .split("")
        .map((n) => parseInt(n) as Bit);

      const inputs = generatePair(2, 4);

      const res = await gate.eval([inputs, selectAsBits]);
      expect(res[0]).toEqual(inputs[i]);
    }

    // 3 select
    gate = new MultiWayMultiplexerGate(2, 3);
    for (let i = 0; i < 8; i++) {
      const selectAsBits: BitArray = i
        .toString(2)
        .padStart(3, "0")
        .split("")
        .map((n) => parseInt(n) as Bit);

      const inputs = generatePair(2, 8);

      const res = await gate.eval([inputs, selectAsBits]);
      expect(res[0]).toEqual(inputs[i]);
    }
    // 4 select
    gate = new MultiWayMultiplexerGate(2, 4);
    for (let i = 0; i < 16; i++) {
      const selectAsBits: BitArray = i
        .toString(2)
        .padStart(4, "0")
        .split("")
        .map((n) => parseInt(n) as Bit);

      const inputs = generatePair(2, 16);

      const res = await gate.eval([inputs, selectAsBits]);
      expect(res[0]).toEqual(inputs[i]);
    }
  });
});
