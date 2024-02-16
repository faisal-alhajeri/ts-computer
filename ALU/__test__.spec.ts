import { BitArray } from "../gate";
import { ALU, ALUControl, ALUInputs } from "./ALU";

// TODO: continuo the test cases for all ALU control inputs

const zeroControl: ALUControl = [1, 0, 1, 0, 1, 0];
const oneControl: ALUControl = [1, 1, 1, 1, 1, 1];
const ngOneControl: ALUControl = [1, 1, 1, 0, 1, 0];

describe("ALU gate", () => {
  const alu = new ALU(4);

  test("zero operation", () => {
    const inputs: ALUInputs = [
      [
        [1, 1, 1, 0],
        [0, 1, 0, 1],
      ],
      zeroControl,
    ];

    const [[res], [zr, ng]] = alu.eval(inputs);

    expect(res).toEqual([0, 0, 0, 0]);
    expect(zr).toEqual(1);
    expect(ng).toEqual(0);
  });

  test("ng one operation", () => {
    const inputs: ALUInputs = [
      [
        [1, 1, 1, 0],
        [0, 1, 0, 1],
      ],
      oneControl,
    ];

    const [[res], [zr, ng]] = alu.eval(inputs);

    expect(res).toEqual([0, 0, 0, 1]);
    expect(zr).toEqual(0);
    expect(ng).toEqual(0);
  });

  test("ng one operation", () => {
    const inputs: ALUInputs = [
      [
        [1, 1, 1, 0],
        [0, 1, 0, 1],
      ],
      ngOneControl,
    ];

    const [[res], [zr, ng]] = alu.eval(inputs);

    expect(res).toEqual([1, 1, 1, 1]);
    expect(zr).toEqual(0);
    expect(ng).toEqual(1);
  });
});
