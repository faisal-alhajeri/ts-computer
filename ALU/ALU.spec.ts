import { BitArray } from "../gate";
import { ALU, ALUControl, ALUInputs, ALUOutputs } from "./ALU";

// TODO: continuo the test cases for all ALU control inputs

const zeroControl: ALUControl = [1, 0, 1, 0, 1, 0];
const oneControl: ALUControl = [1, 1, 1, 1, 1, 1];
const ngOneControl: ALUControl = [1, 1, 1, 0, 1, 0];
const xControl: ALUControl = [0, 0, 1, 1, 0, 0];
const yControl: ALUControl = [1, 1, 0, 0, 0, 0];
const notXControl: ALUControl = [0, 0, 1, 1, 0, 1];
const notYControl: ALUControl = [1, 1, 0, 0, 0, 1];
const minusXControl: ALUControl = [0, 0, 1, 1, 1, 1];
const minusYControl: ALUControl = [1, 1, 0, 0, 1, 1];
const xPlus1Control: ALUControl = [0, 1, 1, 1, 1, 1];
const yPlus1Control: ALUControl = [1, 1, 0, 1, 1, 1];
const xMinus1Control: ALUControl = [0, 0, 1, 1, 1, 0];
const yMinus1Control: ALUControl = [1, 1, 0, 0, 1, 0];
const xPlusYControl: ALUControl = [0, 0, 0, 0, 1, 0];
const xMinusYControl: ALUControl = [0, 1, 0, 0, 1, 1];
const YMinusXControl: ALUControl = [0, 0, 0, 1, 1, 1];
const YAndXControl: ALUControl = [0, 0, 0, 0, 0, 0];
const YorXControl: ALUControl = [0, 1, 0, 1, 0, 1];

type ALUPair = { inputs: ALUInputs; outputs: ALUOutputs };

describe("ALU gate", () => {
  const alu = new ALU(4);

  function testPairs({ pairs }: { pairs: ALUPair[] }) {
    for (const pair of pairs) {
      const out = alu.eval(pair.inputs);
      expect(out).toEqual(pair.outputs);
    }
  }

  test("zero operation", () => {
    const pairs: ALUPair[] = [
      {
        inputs: [
          [
            [1, 1, 1, 0],
            [0, 1, 0, 1],
          ],
          zeroControl,
        ],
        outputs: [[[0, 0, 0, 0]], [1, 0]],
      },
      {
        inputs: [
          [
            [1, 0, 1, 1],
            [1, 1, 0, 1],
          ],
          zeroControl,
        ],
        outputs: [[[0, 0, 0, 0]], [1, 0]],
      },
    ];

    testPairs({ pairs });

    // const inputs: ALUInputs = [
    //   [
    //     [1, 1, 1, 0],
    //     [0, 1, 0, 1],
    //   ],
    //   zeroControl,
    // ];

    // const [[res], [zr, ng]] = alu.eval(inputs);

    // expect(res).toEqual([0, 0, 0, 0]);
    // expect(zr).toEqual(1);
    // expect(ng).toEqual(0);
  });

  test("one operation", () => {
    const pairs: ALUPair[] = [
      {
        inputs: [
          [
            [1, 1, 1, 0],
            [0, 1, 0, 1],
          ],
          oneControl,
        ],
        outputs: [[[0, 0, 0, 1]], [0, 0]],
      },
      {
        inputs: [
          [
            [1, 0, 1, 1],
            [1, 1, 0, 1],
          ],
          oneControl,
        ],
        outputs: [[[0, 0, 0, 1]], [0, 0]],
      },
    ];

    testPairs({ pairs });
  });

  test("ng one operation", () => {
    const pairs: ALUPair[] = [
      {
        inputs: [
          [
            [1, 1, 1, 0],
            [0, 1, 0, 1],
          ],
          ngOneControl,
        ],
        outputs: [[[1, 1, 1, 1]], [0, 1]],
      },
      {
        inputs: [
          [
            [1, 0, 1, 1],
            [1, 1, 0, 1],
          ],
          ngOneControl,
        ],
        outputs: [[[1, 1, 1, 1]], [0, 1]],
      },
    ];

    testPairs({ pairs });
  });

  test("x operation", () => {
    const pairs: ALUPair[] = [
      {
        inputs: [
          [
            [1, 1, 1, 0],
            [0, 1, 0, 1],
          ],
          xControl,
        ],
        outputs: [[[1, 1, 1, 0]], [0, 1]],
      },
      {
        inputs: [
          [
            [0, 0, 1, 1],
            [1, 0, 0, 1],
          ],
          xControl,
        ],
        outputs: [[[0, 0, 1, 1]], [0, 0]],
      },
      {
        inputs: [
          [
            [0, 0, 0, 0],
            [1, 1, 0, 1],
          ],
          xControl,
        ],
        outputs: [[[0, 0, 0, 0]], [1, 0]],
      },
    ];

    testPairs({ pairs });
  });

  test("y operation", () => {
    const pairs: ALUPair[] = [
      {
        inputs: [
          [
            [0, 1, 0, 1],
            [1, 1, 1, 0],
          ],
          yControl,
        ],
        outputs: [[[1, 1, 1, 0]], [0, 1]],
      },
      {
        inputs: [
          [
            [1, 0, 0, 1],
            [0, 0, 1, 1],
          ],
          yControl,
        ],
        outputs: [[[0, 0, 1, 1]], [0, 0]],
      },
      {
        inputs: [
          [
            [1, 1, 0, 1],
            [0, 0, 0, 0],
          ],
          yControl,
        ],
        outputs: [[[0, 0, 0, 0]], [1, 0]],
      },
    ];

    testPairs({ pairs });
  });

  test("not x operation", () => {
    const pairs: ALUPair[] = [
      {
        inputs: [
          [
            [1, 1, 1, 0],
            [0, 1, 0, 1],
          ],
          notXControl,
        ],
        outputs: [[[0, 0, 0, 1]], [0, 0]],
      },
      {
        inputs: [
          [
            [0, 0, 1, 1],
            [1, 0, 0, 1],
          ],
          notXControl,
        ],
        outputs: [[[1, 1, 0, 0]], [0, 1]],
      },
      {
        inputs: [
          [
            [0, 0, 0, 0],
            [1, 1, 0, 1],
          ],
          notXControl,
        ],
        outputs: [[[1, 1, 1, 1]], [0, 1]],
      },
      {
        inputs: [
          [
            [1, 1, 1, 1],
            [1, 1, 0, 1],
          ],
          notXControl,
        ],
        outputs: [[[0, 0, 0, 0]], [1, 0]],
      },
    ];

    testPairs({ pairs });
  });

  test("not y operation", () => {
    const pairs: ALUPair[] = [
      {
        inputs: [
          [
            [0, 1, 0, 1],
            [1, 1, 1, 0],
          ],
          notYControl,
        ],
        outputs: [[[0, 0, 0, 1]], [0, 0]],
      },
      {
        inputs: [
          [
            [1, 0, 0, 1],
            [0, 0, 1, 1],
          ],
          notYControl,
        ],
        outputs: [[[1, 1, 0, 0]], [0, 1]],
      },
      {
        inputs: [
          [
            [1, 1, 0, 1],
            [0, 0, 0, 0],
          ],
          notYControl,
        ],
        outputs: [[[1, 1, 1, 1]], [0, 1]],
      },
      {
        inputs: [
          [
            [1, 1, 0, 1],
            [1, 1, 1, 1],
          ],
          notYControl,
        ],
        outputs: [[[0, 0, 0, 0]], [1, 0]],
      },
    ];

    testPairs({ pairs });
  });

  test("minus x operation", () => {
    const pairs: ALUPair[] = [
      {
        inputs: [
          [
            [1, 1, 1, 0],
            [0, 1, 0, 1],
          ],
          minusXControl,
        ],
        outputs: [[[0, 0, 1, 0]], [0, 0]],
      },
      {
        inputs: [
          [
            [0, 0, 1, 1],
            [1, 0, 0, 1],
          ],
          minusXControl,
        ],
        outputs: [[[1, 1, 0, 1]], [0, 1]],
      },
      {
        inputs: [
          [
            [0, 0, 0, 0],
            [1, 1, 0, 1],
          ],
          minusXControl,
        ],
        outputs: [[[0, 0, 0, 0]], [1, 0]],
      },
      {
        inputs: [
          [
            [1, 1, 1, 1],
            [1, 1, 0, 1],
          ],
          minusXControl,
        ],
        outputs: [[[0, 0, 0, 1]], [0, 0]],
      },
    ];

    testPairs({ pairs });
  });

  test("minus y operation", () => {
    const pairs: ALUPair[] = [
      {
        inputs: [
          [
            [0, 1, 0, 1],
            [1, 1, 1, 0],
          ],
          minusYControl,
        ],
        outputs: [[[0, 0, 1, 0]], [0, 0]],
      },
      {
        inputs: [
          [
            [1, 0, 0, 1],
            [0, 0, 1, 1],
          ],
          minusYControl,
        ],
        outputs: [[[1, 1, 0, 1]], [0, 1]],
      },
      {
        inputs: [
          [
            [1, 1, 0, 1],
            [0, 0, 0, 0],
          ],
          minusYControl,
        ],
        outputs: [[[0, 0, 0, 0]], [1, 0]],
      },
      {
        inputs: [
          [
            [1, 1, 0, 1],
            [1, 1, 1, 1],
          ],
          minusYControl,
        ],
        outputs: [[[0, 0, 0, 1]], [0, 0]],
      },
    ];

    testPairs({ pairs });
  });

  test("x plus 1 operation", () => {
    const pairs: ALUPair[] = [
      {
        inputs: [
          [
            [1, 1, 1, 0],
            [0, 1, 0, 1],
          ],
          xPlus1Control,
        ],
        outputs: [[[1, 1, 1, 1]], [0, 1]],
      },
      {
        inputs: [
          [
            [0, 0, 1, 1],
            [1, 0, 0, 1],
          ],
          xPlus1Control,
        ],
        outputs: [[[0, 1, 0, 0]], [0, 0]],
      },
      {
        inputs: [
          [
            [0, 0, 0, 0],
            [1, 1, 0, 1],
          ],
          xPlus1Control,
        ],
        outputs: [[[0, 0, 0, 1]], [0, 0]],
      },
      {
        inputs: [
          [
            [1, 1, 1, 1],
            [1, 1, 0, 1],
          ],
          xPlus1Control,
        ],
        outputs: [[[0, 0, 0, 0]], [1, 0]],
      },
    ];

    testPairs({ pairs });
  });

  test("y plus 1 operation", () => {
    const pairs: ALUPair[] = [
      {
        inputs: [
          [
            [0, 1, 0, 1],
            [1, 1, 1, 0],
          ],
          yPlus1Control,
        ],
        outputs: [[[1, 1, 1, 1]], [0, 1]],
      },
      {
        inputs: [
          [
            [1, 0, 0, 1],
            [0, 0, 1, 1],
          ],
          yPlus1Control,
        ],
        outputs: [[[0, 1, 0, 0]], [0, 0]],
      },
      {
        inputs: [
          [
            [1, 1, 0, 1],
            [0, 0, 0, 0],
          ],
          yPlus1Control,
        ],
        outputs: [[[0, 0, 0, 1]], [0, 0]],
      },
      {
        inputs: [
          [
            [1, 1, 0, 1],
            [1, 1, 1, 1],
          ],
          yPlus1Control,
        ],
        outputs: [[[0, 0, 0, 0]], [1, 0]],
      },
    ];

    testPairs({ pairs });
  });

  test("x minus 1 operation", () => {
    const pairs: ALUPair[] = [
      {
        inputs: [
          [
            [1, 1, 1, 0],
            [0, 1, 0, 1],
          ],
          xMinus1Control,
        ],
        outputs: [[[1, 1, 0, 1]], [0, 1]],
      },
      {
        inputs: [
          [
            [0, 0, 1, 1],
            [1, 0, 0, 1],
          ],
          xMinus1Control,
        ],
        outputs: [[[0, 0, 1, 0]], [0, 0]],
      },
      {
        inputs: [
          [
            [0, 0, 0, 0],
            [1, 1, 0, 1],
          ],
          xMinus1Control,
        ],
        outputs: [[[1, 1, 1, 1]], [0, 1]],
      },
      {
        inputs: [
          [
            [1, 1, 1, 1],
            [1, 1, 0, 1],
          ],
          xMinus1Control,
        ],
        outputs: [[[1, 1, 1, 0]], [0, 1]],
      },
    ];

    testPairs({ pairs });
  });

  test("y minus 1 operation", () => {
    const pairs: ALUPair[] = [
      {
        inputs: [
          [
            [0, 1, 0, 1],
            [1, 1, 1, 0],
          ],
          yMinus1Control,
        ],
        outputs: [[[1, 1, 0, 1]], [0, 1]],
      },
      {
        inputs: [
          [
            [1, 0, 0, 1],
            [0, 0, 1, 1],
          ],
          yMinus1Control,
        ],
        outputs: [[[0, 0, 1, 0]], [0, 0]],
      },
      {
        inputs: [
          [
            [1, 1, 0, 1],
            [0, 0, 0, 0],
          ],
          yMinus1Control,
        ],
        outputs: [[[1, 1, 1, 1]], [0, 1]],
      },
      {
        inputs: [
          [
            [1, 1, 0, 1],
            [1, 1, 1, 1],
          ],
          yMinus1Control,
        ],
        outputs: [[[1, 1, 1, 0]], [0, 1]],
      },
    ];

    testPairs({ pairs });
  });
});
