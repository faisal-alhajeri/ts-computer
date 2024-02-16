import { Bit, BitArray } from ".";
import { AndGate } from "./derived/and";
import { MultiBitAnd as MultiBitAndGate } from "./derived/and/multi/bit";
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
  test("reverse not gate", () => {
    const notGate = new NotGate();
    expect(notGate.eval([1])[0]).toEqual(0);
    expect(notGate.eval([0])[0]).toEqual(1);
  });

  test("or gate", () => {
    const orGate = new OrGate();
    expect(orGate.eval([0, 0])[0]).toEqual(0);
    expect(orGate.eval([0, 1])[0]).toEqual(1);
    expect(orGate.eval([1, 0])[0]).toEqual(1);
    expect(orGate.eval([1, 1])[0]).toEqual(1);
  });

  test("and gate", () => {
    const andGate = new AndGate();
    expect(andGate.eval([0, 0])[0]).toEqual(0);
    expect(andGate.eval([0, 1])[0]).toEqual(0);
    expect(andGate.eval([1, 0])[0]).toEqual(0);
    expect(andGate.eval([1, 1])[0]).toEqual(1);
  });

  test("multiplexer gate", () => {
    const multiplexerGate = new MultiplexerGate();
    expect(multiplexerGate.eval([[0, 0], 0])[0]).toEqual(0);
    expect(multiplexerGate.eval([[0, 1], 0])[0]).toEqual(0);
    expect(multiplexerGate.eval([[1, 0], 0])[0]).toEqual(1);
    expect(multiplexerGate.eval([[1, 1], 0])[0]).toEqual(1);
    expect(multiplexerGate.eval([[0, 0], 1])[0]).toEqual(0);
    expect(multiplexerGate.eval([[0, 1], 1])[0]).toEqual(1);
    expect(multiplexerGate.eval([[1, 0], 1])[0]).toEqual(0);
    expect(multiplexerGate.eval([[1, 1], 1])[0]).toEqual(1);
  });

  test("demultiplexer gate", () => {
    const demultiplexerGate = new DeMultiplexerGate();
    expect(demultiplexerGate.eval([[0], 0])).toEqual([0, 0]);
    expect(demultiplexerGate.eval([[1], 0])).toEqual([1, 0]);
    expect(demultiplexerGate.eval([[0], 1])).toEqual([0, 0]);
    expect(demultiplexerGate.eval([[1], 1])).toEqual([0, 1]);
  });
});

describe("multibit gates", () => {
  test("multi bit not", () => {
    const multiNot = new MultiBitNotGate(4);
    const [res] = multiNot.eval([[1, 0, 0, 1]]);
    expect(res).toEqual([0, 1, 1, 0]);
  });

  test("multi bit or", () => {
    const multiOr = new MultiBitOrGate(4);
    const [res] = multiOr.eval([
      [1, 1, 0, 0],
      [1, 0, 1, 0],
    ]);

    expect(res).toEqual([1, 1, 1, 0]);
  });

  test("multi bit And", () => {
    const multiAnd = new MultiBitAndGate(4);
    const [res] = multiAnd.eval([
      [1, 1, 0, 0],
      [1, 0, 1, 0],
    ]);

    expect(res).toEqual([1, 0, 0, 0]);
  });

  test("multi bit Multplexer", () => {
    const multiBitMultiplexerGate = new MultiBitMultiplexerGate();
    expect(
      multiBitMultiplexerGate.eval([
        [
          [1, 1, 0, 0],
          [0, 1, 1, 0],
        ],
        0,
      ])[0]
    ).toEqual([1, 1, 0, 0]);

    expect(
      multiBitMultiplexerGate.eval([
        [
          [1, 1, 0, 0],
          [0, 1, 1, 0],
        ],
        1,
      ])[0]
    ).toEqual([0, 1, 1, 0]);
  });

  test("multi bit DeMultplexer", () => {
    const multiBitDeMultiplexerGate = new MultiBitDeMultiplexerGate();
    expect(multiBitDeMultiplexerGate.eval([[1, 1, 0, 0], 0])).toEqual([
      [1, 1, 0, 0],
      [0, 0, 0, 0],
    ]);
    expect(multiBitDeMultiplexerGate.eval([[1, 1, 0, 0], 1])).toEqual([
      [0, 0, 0, 0],
      [1, 1, 0, 0],
    ]);
  });
});

describe("multi way", () => {
  test("multi way or", () => {
    expect.assertions(4);
    const gate = new MultiWayOrGate(5);
    expect(gate.eval([[1, 0, 0, 1, 0]])).toEqual([1]);
    expect(gate.eval([[0, 0, 0, 1, 0]])).toEqual([1]);
    expect(gate.eval([[0, 0, 0, 0, 0]])).toEqual([0]);
    try {
      gate.eval([[0, 0, 0, 0]]);
    } catch (e) {
      expect(e).toBeDefined();
    }
  });

  test("multi way demultiplexer", () => {
    // 2 select
    let gate = new MultiWayDeMultiplexerGate(5, 2);
    for (let i = 0; i < 4; i++) {
      const selectAsBits: BitArray = i
        .toString(2)
        .padStart(2, "0")
        .split("")
        .map((n) => parseInt(n) as Bit);

      const res = gate.eval([[1, 1, 0, 1, 0], selectAsBits]);
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
      const res = gate.eval([[1, 0], selectAsBits]);
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
      const res = gate.eval([[1, 0], selectAsBits]);
      expect(res[i]).toEqual([1, 0]);
      for (const arr of res.filter((_, idx) => idx !== i))
        expect(arr).toEqual([0, 0]);
    }
  });

  test("multi way multiplexer", () => {
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
        .padStart(3, "0")
        .split("")
        .map((n) => parseInt(n) as Bit);

      const inputs = generatePair(2, 4);

      const res = gate.eval([inputs, selectAsBits]);
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

      const res = gate.eval([inputs, selectAsBits]);
      expect(res[0]).toEqual(inputs[i]);
    }
    // 4 select
    gate = new MultiWayMultiplexerGate(2, 4);
    for (let i = 0; i < 16; i++) {
      const selectAsBits: BitArray = i
        .toString(2)
        .padStart(3, "0")
        .split("")
        .map((n) => parseInt(n) as Bit);

      const inputs = generatePair(2, 16);

      const res = gate.eval([inputs, selectAsBits]);
      expect(res[0]).toEqual(inputs[i]);
    }
  });
});
